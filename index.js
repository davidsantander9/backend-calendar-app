const express = require('express');
require('dotenv').config();

// create express server

const app = express();

// Read, parse body
app.use( express.json() );

app.use( express.static('public'))

// Routes
app.use('/api/auth', require('./routes/auth'))


// Listen request
app.listen( process.env.PORT, () =>{
    console.log(`Hello Server ${ process.env.PORT }`)
} )