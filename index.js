const express = require('express');

const db = require('./data/hubs-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Web20 Node Edition');
})

server.get('/hubs', (req,res) => {
   db.find()
   .then(hubs => {
       res.status(200).json(hubs)
   })
   .catch(err => {
       res.status(500).json(err)
   })
})

server.post('/hubs', (req,res) => {
    const hubInfo = req.body;
    console.log(hubInfo);

    db.add(hubInfo)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch( err => {
        res.status(500).json(err);
    })
})

server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then( deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Hub could not be found'})
        }
    })
    .catch( err => {
        res.status(500).json(err);
    })
})

server.put('/hubs/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.update(id, changes)
    .then( updated => {
        if(updated){
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: 'Hub could not be found'})
        }
    })
    .catch( err => {
        res.status(500).json(err);
    })
})

const port = 5000;
server.listen(port, () => console.log(`\n*** Running on port ${port} ***\n`))