const express = require('express');
const createMic = require('mic-stream');
const createBonjour = require('bonjour');
const speaker = require('speaker');
const lame = require('lame');

const create = ({
  name,
  port,
}) => {
  const bonjour = createBonjour();
  const app = express();
  app.get('/stream', (request, response) => {
    const mic = createMic();
    const encoder = new lame.Encoder({
      channels: 2,
      bitDepth: 16,
      sampleRate: 44100,
      bitRate: 128,
      outSampleRate: 22050,
      mode: lame.STEREO,
    });
    response.contentType('audio/mpeg');
    mic.pipe(encoder).pipe(response);
  });

  app.get('/info', (request, response) => {
    response.json({
      name,
    });
  });

  app.listen(port, () => {
    console.log('Server running on port ' + port);
    bonjour.publish({ name: 'WirelessMediaStream', type: 'http', port });
  });
};

module.exports = create;

