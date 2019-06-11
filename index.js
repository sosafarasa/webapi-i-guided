const express = require('express');
const db = require('./data/hubs-model');

const server = express();

// Middleware
server.use(express.json()); // teaches express how to parse JSON from the request body


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

//CRUD

//R

server.get('/hubs', (req, res) => {
    db.find()
    .then(hubs => res.status(200).json(hubs))
    .catch(err => res.status(500).json({message: 'Something went wrong retrieving the hubs'}))
})

//C

server.post('/hubs', (req, res) => {
    //axios.post('/', {hubInfo})
    const hubInfo = req.body;
    console.log(hubInfo)
    db.add(hubInfo)
    .then(hub => res.status(201).json(hub))
    .catch(err => res.status(500).json('couldnt add hub'))
})

//D

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(count => {
        if(count){
            res.status(204).json({message:"It worked"})
        }
        else{
            res.status(404).json({message: "there is no hub with this id"})
        }
    })
    .catch(err => res.status(500).json({message: "error deleting hub"}))
})

//U

server.put('/hubs/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
    .then(updated => {
        if(updated){
            res.status(200).json({success: true, updated})
        } else {
            res.status(404).json({message: "there is no hub with this id"})
        }
    })
    .catch(err => res.status(500).json({message: "something went wrong updating the hub"}))
})

server.listen(4000, () => console.log('My first express server is running on port 4000'));