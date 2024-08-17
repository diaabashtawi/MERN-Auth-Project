import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import {connectToDatabase} from "./database/databaseConnection.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const __dirname = path.resolve();
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
// Allow us to parse the incoming requests to json [req.body]
app.use(express.json())
app.use(cookieParser());

app.use(`/api/auth`, authRoutes)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Home page route
app.get('/', (req, res) => {
    res.send('Hello World! to Auth App');
})

app.listen(port, ()=>{
    connectToDatabase().then(r => {})
    console.log(`listening on port ${process.env.PORT}`);
})
