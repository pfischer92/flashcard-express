
const log4js = require('log4js');
const dotenv = require('dotenv-extended');
const express = require('express')

log4js.configure('log4js.json');
let logger = log4js.getLogger('App');

// Read the properties from file '.env' and '.env.defaults'
dotenv.load({silent: true});
let PORT = process.env.PORT || 8000;

var app = express()

app.get('/', (req, res) =>
  res.send('Hello World\n')
)
app.listen(PORT)

// Put a friendly message on the terminal
logger.info(`Server running on ${PORT}`);
