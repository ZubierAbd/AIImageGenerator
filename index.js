const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path')

const port = process.env.PORT || 5000;



const app = express();


//Set body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Static folder

app.use(express.static(path.join(__dirname, 'public')))

app.use('/openai', require('./routes/openAiRoutes'))

app.listen(port, () => {
    console.log("We are listening on " + port)
}
)