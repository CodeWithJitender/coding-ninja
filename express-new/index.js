const express = require('express');
const server = express();

server.get('/', (req, res) => {
  return res.send('Hello World!');
});

// my static files are in the public folder server.use is serving the static files from the public folder
server.use(express.static('public'));
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});