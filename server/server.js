import { app, server } from "./socket/socket.js";
import express from "express";
import { connectDB } from "./db/connection1.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";


connectDB();

app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        "https://mern-stack-chat-app-asifiqbal.netlify.app",
        "http://localhost:5173", // for local development
        "http://localhost:5174"  // for local development alternate port
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

//routes
import userRouter from "./routes/user.route.js";
import messsageRoute from "./routes/message.route.js"
app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messsageRoute);

app.get('/', (req, res) => {
    res.send({
        activeStatus:true,
        error:false,
    })
})

//middlewares
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

// Try to start server with fallback ports
const startServer = async () => {
    const ports = [PORT, 5001, 5002, 5003];
    
    for (const port of ports) {
        try {
            await new Promise((resolve, reject) => {
                server.listen(port)
                    .once('listening', () => {
                        console.log(`Server is running on port ${port}`);
                        resolve();
                    })
                    .once('error', (err) => {
                        if (err.code === 'EADDRINUSE') {
                            console.log(`Port ${port} is busy, trying next port...`);
                            reject(err);
                        } else {
                            reject(err);
                        }
                    });
            });
            // If we get here, the server started successfully
            break;
        } catch (err) {
            if (port === ports[ports.length - 1]) {
                console.error('All ports are in use. Please free up a port or specify a different port.');
                process.exit(1);
            }
            // Otherwise continue to next port
            continue;
        }
    }
};

startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
