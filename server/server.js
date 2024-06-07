// Required modules
// Required modules
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Express app
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Express app
const app = express();

// Multer upload
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose connection
const collection = require('./src/mongodb.js');
const userModel = require('./models/user.js');

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

  exec(spleeterCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running Spleeter: ${error.message}`);
      return res.status(500).json({ message: 'Error processing the audio file', error: error.message });
    }

    if (stderr) {
      console.error(`Spleeter stderr: ${stderr}`);
      return res.status(500).json({ message: 'Error processing the audio file', error: stderr });
    }

    console.log(`Spleeter stdout: ${stdout}`);

    fs.readdir(outputDir, (err, files) => {
      if (err) {
        console.error(`Error reading output directory: ${err.message}`);
        return res.status(500).json({ message: 'Error reading output directory', error: err.message });
      }

      const filePaths = files.map(file => ({
        name: file,
        url: `http://localhost:5000/download?file=${encodeURIComponent(path.join(outputDir, file))}`
      }));

      res.json({
        message: 'File uploaded and processed successfully',
        isDone: true,
        files: filePaths
      });
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
app.post('/signup', (req, res) => {
  userModel.create(req.body)
  .then((users) => res.json(users))
  .catch((err) => res.json(err));
});

// Sign in
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json({ message: 'Incorrect password' });
        }
      } else {
        res.json({ message: 'User not found' });
      }
    })
    .catch((err) => res.json(err));
});

// App listening
// Multer upload
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose connection
const collection = require('./src/mongodb.js');
const userModel = require('./models/user.js');

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

  exec(spleeterCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running Spleeter: ${error.message}`);
      return res.status(500).json({ message: 'Error processing the audio file', error: error.message });
    }

    if (stderr) {
      console.error(`Spleeter stderr: ${stderr}`);
      return res.status(500).json({ message: 'Error processing the audio file', error: stderr });
    }

    console.log(`Spleeter stdout: ${stdout}`);

    fs.readdir(outputDir, (err, files) => {
      if (err) {
        console.error(`Error reading output directory: ${err.message}`);
        return res.status(500).json({ message: 'Error reading output directory', error: err.message });
      }

      const filePaths = files.map(file => ({
        name: file,
        url: `http://localhost:5000/download?file=${encodeURIComponent(path.join(outputDir, file))}`
      }));

      res.json({
        message: 'File uploaded and processed successfully',
        isDone: true,
        files: filePaths
      });
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
app.post('/signup', (req, res) => {
  userModel.create(req.body)
  .then((users) => res.json(users))
  .catch((err) => res.json(err));
});

// Sign in
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json({ message: 'Incorrect password' });
        }
      } else {
        res.json({ message: 'User not found' });
      }
    })
    .catch((err) => res.json(err));
});

// App listening
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
