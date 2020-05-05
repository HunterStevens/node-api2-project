const express = require('express');
const server = express();
const postsRouter = require('./postsRouter');

server.use(express.json());



server.listen(8000, () => console.log('Node-API2 project up and running!'));