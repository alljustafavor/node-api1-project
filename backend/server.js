const express = require('express');
const User = require('./users/model');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.json({ hello: 'world' })
});

server.get('/api/users', async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "The users information could not be retrieved"
        });
    }
});

server.post('/api/users', async (req, res) => {
    try {
        const user = req.body;
        const new_user = await User.insert(user);
        if (!user.name || !user.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            });
        } else {
            res.status(201).json(new_user);
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        });
    }
});

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({
            message: "The user information could not be retrieved"
        });
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const user = await User.update(id, updates)
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            });
        } else {
            if (!updates.name || !updates.bio) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                });
            } else {
                res.status(200).json(user);
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "The user information could not be retrieved"
        });
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const delete_user = await User.remove(id);
        if (!delete_user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            });
        } else {
            res.status(200).json(delete_user);
        }
    } catch (error) {
        res.status(500).json({
            message: "The user could not be removed"
        });
    }
})



module.exports = server; 
