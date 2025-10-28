import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

//console.log(process.env.CLIENT_URL)

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    },
    transports: ['websocket', 'polling'],
})

const userSocketMap = {
    //userId : socketId
}

io.on("connection", (socket) => {
    console.log("New socket connection:", socket.id);
    
    const userId = socket.handshake.query.userId;
    if (!userId) {
        console.log("Socket connection rejected - no userId provided");
        socket.disconnect();
        return;
    }

    userSocketMap[userId] = socket.id;
    console.log("User connected:", userId);
    console.log("Current online users:", Object.keys(userSocketMap));

    io.emit("onlineUsers", Object.keys(userSocketMap));

    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", userId);
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap));
    });
})

const getSocketId = (userId) => {
    return userSocketMap[userId]
}

export {io, app, server, getSocketId}