require('dotenv').config();

const http = require('http');
const express = require('express');

const mongoose = require('mongoose');
const indexRoutes = require('./routes/home.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//mongoose

mongoose
.connect(`mongodb://localhost/MyRecipes`, 
{useNewUrlParser: true},
)
.then(x => console.log(`Connected to Mongo. Database name: ${x.connections[0].name}`))
.catch(err => console.error('Error connecting to Mongo.', err));


app.use('/', indexRoutes); // localhost:3000
app.use('/auth', authRoutes); // localhost:3000/auth

server.listen(PORT, (err) => {
    console.log(`Conected to port: ${PORT}`);
});