// Required modules
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

// Express app
const app = express();

// Multer upload
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  }
}));

// Mongoose connection
const collection = require('./src/mongodb.js');
const userModel = require('./models/user.js');
const fileModel = require('./models/files.js');
const { Mongoose, mongo } = require('mongoose');

// Server is running message
app.get('/', (req, res) => {
  res.send('Server is running!');
});


// Execute python commands
app.post('/upload', upload.single('audioFile'), (req, res) => {

  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileName = path.basename(file.path);
  console.log('Uploaded file name:', fileName);

  const outputDir = path.resolve(__dirname, 'outputs', fileName);
  console.log('Output directory:', outputDir);

  let activateScript1 = 'cd .venv';
  let activateScript2 = '.\\Scripts\\activate';
  let activateScript3 = 'cd ..\\';

  const spleeterCommand = `${activateScript1} && ${activateScript2} && ${activateScript3} && spleeter separate -o outputs -p spleeter:4stems uploads/${fileName}`;

  exec(spleeterCommand, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running Spleeter: ${error.message}`);
      return res.status(500).json({ message: 'Error processing the audio file', error: error.message });
    }

    if (stderr) {
      console.error(`Spleeter stderr: ${stderr}`);
      return res.status(500).json({ message: 'Error processing the audio file', error: stderr });
    }

    console.log(`Spleeter stdout: ${stdout}`);

    fs.readdir(outputDir, async (err, files) => {
      if (err) {
        console.error(`Error reading output directory: ${err.message}`);
        return res.status(500).json({ message: 'Error reading output directory', error: err.message });
      }

      const filePaths = files.map(file => ({
        name: file,
        url: `http://localhost:5000/download?file=${encodeURIComponent(path.join(outputDir, file))}`
      }));

      // Save file information to the database
      try {
        const newFile = new fileModel({
          convertedBass: filePaths.find((file) => file.name === 'bass.wav').url,
          convertedVocal: filePaths.find((file) => file.name === 'vocals.wav').url,
          convertedDrums: filePaths.find((file) => file.name === 'drums.wav').url,
          convertedOther: filePaths.find((file) => file.name === 'other.wav').url
        });

        const savedFile = await newFile.save();
        console.log('File saved to database:', savedFile);

        res.json({
          message: 'File uploaded and processed successfully',
          isDone: true,
          files: filePaths
        });
      } catch (dbError) {
        console.error(`Error saving file to database: ${dbError.message}`);
        return res.status(500).json({ message: 'Error saving file to database', error: dbError.message });
      }
    });
  });
});


// Router for downloading the files
app.get('/download', (req, res) => {
  const filePath = req.query.file;
  if (!filePath) {
    return res.status(400).json({ message: 'File path is required' });
  }

  res.download(filePath, path.basename(filePath), (err) => {
    if (err) {
      console.error(`Error sending file: ${err.message}`);
      res.status(500).json({ message: 'Error sending the file', error: err.message });
    }
  });
});


// Sign up
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  try {
    const existingUser = await userModel.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    const user = await userModel.create({ firstName, lastName, email, password });
    req.session.user = user;
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error: error.message });
  }
});


// Sign in
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user && user.password === password) {
      req.session.user = user;
      console.log(req.session);
      res.json({ success: true, user: req.session.user });
    } else {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});

// Sign out
app.post('/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ message: 'Error signing out' });
    } else {
      console.log('Session destroyed');
      res.clearCookie('connect.sid')
      res.redirect('/');
    }
  });
});

// Current user
app.get('/current-user', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Deduct credit
app.post('/deduct-credit', async (req, res) => {
  if (req.session.user) {
    try {
      const user = await userModel.findById(req.session.user._id);
      if (user && user.credits > 0) {
        user.credits -= 1;
        await user.save();
        req.session.user = user;
        res.json({ credits: user.credits, user });
      } else {
        res.status(400).json({ message: 'Insufficient credits' });
      }
    } catch (error) {
      console.error('Error deducting credits:', error);
      res.status(500).json({ message: 'Error deducting credits', error: error.message });
    }
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Update profile
app.post('/update-profile', async (req, res) => {
    const { firstName, lastName, email } = req.body;


    // Check for valid email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Email must be in a valid format' });
    }
    // Check if user is authenticated
    if(!req.session.user){
        return res.status(401).json({message: 'Not authenticated'});
    }

    try{
      const user = await userModel.findById(req.session.user._id);
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if(email !== user.email){
            const existingUser = await userModel.findOne({email});
            if(existingUser){
                return res.status(400).json({message: 'Email already in use'});
            }
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        await user.save();
        req.session.user = user;
        res.json({message: 'Profile updated', user});

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({message: 'Error updating profile', error: error.message});
    }
});


// App listening
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
