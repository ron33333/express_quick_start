const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Get all users
router.get('/', (req, res) => {
    const users = userService.getAll();
    res.send(users);
})

// Get a specific user
router.get('/:email', (req, res) => { // user/shahar@gmail.com
    const { email } = req.params;
    const user = userService.getUser(email);
    if (!user) {
        res.status(404).send();
    } else {
        res.send(user);
    }
})

// Create a user
router.post('/', (req, res) => { // add a user
    const user = req.body;
    console.log(req.body)
    if (user.email && user.password && user.name) {
        const success = userService.add(user);
        if (success) {
            res.status(201).send('User added successfully');
        } else {
            res.status(203).send('Rejected')
        }
    } else {
        res.status(203).send('Rejected')
    }
})

// Delete a user
router.delete('/:email', (req, res) => {
    const { email } = req.params;
    userService.deleteUser(email);
    res.send();
})

// Update a user
router.put('/:email', (req, res) => {
    const toUpdate = req.body;
    console.log(req.body)
    const { email } = req.params;
    const updatedUser = userService.update(email, toUpdate);
    console.log(updatedUser)
    if (updatedUser) {
        res.send(updatedUser);
    } else {
        res.status(400).send();
    }
})


module.exports = router;