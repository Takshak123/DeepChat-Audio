const speech = require('@google-cloud/speech');
const fs = require('fs');

const client = new speech.SpeechClient({
  keyFilename: 'service-account-key.json'
});

module.exports = async function transcribe(filePath) {
  const audioBytes = fs.readFileSync(filePath).toString('base64');
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 44100,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  return response.results.map(result => result.alternatives[0].transcript).join('\n');
};
