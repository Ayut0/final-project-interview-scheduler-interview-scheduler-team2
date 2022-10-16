const express = require("express");
const app = express();
const port = 8000;
const { Server } = require('socket.io');
const http = require('http')
const cors = require('cors');
require("dotenv").config();
app.use(cors());
const  server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "EDIT", "DELETE"]
    },
});

const scheduleRoutes = require("./routes/schedule-route");
app.use("/schedule", scheduleRoutes);
const showDay = require("./routes/days-routes");
app.use("/day", showDay);

io.on('connection', (socket) =>{
    console.log(`User connected: ${socket.id}`);

    socket.on("create a new appointment", (data) =>{
        console.log('socket' ,data);
        socket.broadcast.emit('create', data);
    })

    socket.on('delete a appointment', (data) =>{
        console.log('delete_target', data);
        socket.broadcast.emit('delete', data);
    })
})

server.listen(port, () => console.log(`Server is running on port ${port}`));
