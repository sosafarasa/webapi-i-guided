const express = require('express');

const server = express();

server.get('/', (req, res) => {
    //axios.get() .then(res)
    // 200-299---success
    //300-399--- (these are status codes)
    //400-499---users errors
    //500-599---server errors
    res.status(200).send('Hello Web19')
})



server.get('/now', (req, res) => {
    const now = new Date().toString();
    res.send(now)
})

server.listen(4000, () => console.log('My first express server is running on port 4000'));