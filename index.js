const express = require('express');
const server = express();
const postsRouter = require('./postsRouter');

const port = process.env.PORT || 8000;

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        api:'Welcome to posts!'
    })
});


server.use('/api/posts', postsRouter);

server.listen(port, () => console.log('Node-API2 project up and running!'));