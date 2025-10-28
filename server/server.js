import { app, server } from "./socket/socket.js";
import express from "express";
import { connectDB } from "./db/connection1.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";


connectDB();

app.use(cors({
    origin: [process.env.CLIENT_URL, "https://mern-stack-chat-app-asifiqbal.netlify.app/login"],
    credentials: true
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

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
