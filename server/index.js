require('dotenv').config();

const http = require('http');
const express = require('express');

const indexRoutes = require('./routes/home.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', indexRoutes); // localhost:3000
app.use('/auth', authRoutes); // localhost:3000/auth

server.listen(PORT, (err) => {
    console.log(`Conected to port: ${PORT}`);
});