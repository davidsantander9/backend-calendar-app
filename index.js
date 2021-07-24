const express = require('express');
require('dotenv').config();

// create express server

const app = express();


// Routes
app.use('/api/auth', require('./routes/auth'))

app.use( express.static('public'))

// Listen request
app.listen( process.env.PORT, () =>{
    console.log(`Hello Server ${ process.env.PORT }`)
} )