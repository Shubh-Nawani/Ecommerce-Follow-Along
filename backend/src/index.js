import express from 'express';
import dotenv from 'dotenv/config';
import http from 'http';
import connectDB  from './config/db.js';
import path from 'path';
import { env } from 'process';

const app = express();
const server = http.createServer(app);

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
});




