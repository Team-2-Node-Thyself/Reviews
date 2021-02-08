const newrelic = require('newrelic');
const express = require('express');
const request = require('request');
const cors = require('cors');
const compression = require('compression');

const servers = ['http://localhost:8001', 'http://localhost:8002', 'http://localhost:8003', 'http://localhost:8004', 'http://localhost:8005'];
let cur = 0;

const handler = (req, res) => {
  // Pipe the vanilla node HTTP request (a readable stream) into `request`
  // to the next server URL. Then, since `res` implements the writable stream
  // interface, you can just `pipe()` into `res`.
  req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
  cur = (cur + 1) % servers.length;
};
const server = express();
server.use(cors());
server.get('*', handler).patch('*', handler);
server.listen(8000);
