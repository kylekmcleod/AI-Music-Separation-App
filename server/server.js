const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());


app.get('/', (req, res) => {
  res.send('Server is running!');
});

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

    // List the processed files
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

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
