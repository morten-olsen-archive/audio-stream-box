const express = require('express');
const createMic = require('mic-stream');
const createZeroConfig = require('bonjour');
const speaker = require('speaker');
const lame = require('lame');

const bonjour = createZeroConfig();
const app = express();
app.get('/stream', (request, response) => {
  const mic = createMic();
  var encoder = new lame.Encoder({
    channels: 2,        // 2 channels (left and right)
    bitDepth: 16,       // 16-bit samples
    sampleRate: 44100,  // 44,100 Hz sample rate

    bitRate: 128,
    outSampleRate: 22050,
    mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
  });
  mic.pipe(encoder).pipe(response);
});

app.get('/info', (request, response) => {
  response.json({
    hello: 'world',
  });
});

app.listen(5003, () => {
  console.log('Server running');
  bonjour.publish({ name: 'WirelessMediaStream', type: 'http', port: 5003 })
});
