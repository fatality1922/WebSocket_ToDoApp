const express = require('express');
const socket = require('socket.io');

const tasks = [];

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
  });  

const io = socket(server);



io.on('connection', (socket) => {
    console.log('New client! Its id ' + socket.id);
    io.to(socket.id).emit('updateData', tasks);

    socket.on('addTask', (taskName) => {
        console.log('I got new task from ' + socket.id);
        tasks.push(taskName);
        socket.broadcast.emit('addTask', taskName);
    });

    socket.on('removeTask', (taskName) => {
        const task = tasks.find((task) => task.id == taskName);
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
        console.log('Task removed by' + socket.id);
        socket.broadcast.emit('removeTask', taskName);
    });

});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})
