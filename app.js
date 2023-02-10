const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const bodyParser = require('body-parser')

const connectToDB = require('./connectDB');

const allowedOrigins = [
    'http://localhost:3000',
    'https://landstartup.netlify.app'
]
app.use(cors(
    {
        origin: allowedOrigins, // allow the server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    }
))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connectToDB()

const indexRoute = require('./routes/index');

app.use('/', indexRoute);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    next();
});

app.listen(5000, () => {
    console.log("server started on 5000");
})

app.get('/', (req, res) => {
    res.status(200).json("Hello");
}) 

module.exports = app