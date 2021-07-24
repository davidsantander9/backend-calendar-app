const express = require('express');

// create express server

const app = express();


// Routes
// app.get('/', (req, res) => {
//     console.log('/')
//     res.json({
//         ok: true
//     })
// });

app.use( express.static('public'))

// Listen request
app.listen( 4000, () =>{
    console.log(`Hello Server ${ 4000 }`)
} )