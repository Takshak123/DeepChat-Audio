const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const speechToText = require('./speech-to-text');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static('public'));

app.post('/speech', upload.single('audio'), async (req, res) => {
  try {
    const text = await speechToText(req.file.path);
    fs.unlinkSync(req.file.path); // Clean up uploaded file
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Speech recognition failed.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
