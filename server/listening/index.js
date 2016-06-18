const express = require('express');
const cors = require('cors');
const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3939;

app.use(cors({
  origin: '*',
  methods: ['GET, POST, OPTIONS'],
  allowHeaders: 'content-type, accept',
  credentials: true,
  maxAge: 10,
}));

app.listen(port, (err) => {
  if (err) {
    return process.stdout
    .write(`Error on listening server: ${err}\n`);
  }
  return process.stdout
  .write(`Listening server online at http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
});
