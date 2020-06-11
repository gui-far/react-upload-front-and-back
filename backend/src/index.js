require('dotenv').config();
const path = require('path')

//HTTP Server
const express = require('express');

//Routes...
const routes = require('./routes');

//HTTP Logger
const morgan = require('morgan')

//Manipulate Mongo Database
const mongoose = require('mongoose');

//Allow api acces from different domain
const cors = require('cors')

const app = express();

//connection to docker at 127.0.0.1:27017 (This port were exposed)
mongoose.connect(process.env.MONGO_URL, {
    //make mongoose understand this string as connection
    useNewUrlParser: true
})

app.use(cors());

//JSON "body-parser"
app.use(express.json());
//Make express "understand" more features like "files"
app.use(express.urlencoded({extended: true}))

//Enable logging
app.use(morgan('dev'));

//Allow express "provide" static files, so we can access locally from browser while developing
//This is also an route
app.use('/files', express.static(path.resolve(__dirname, '..','tmp','uploads')))

//Use routes
app.use(routes);

//Listen port 3000
app.listen(3000);