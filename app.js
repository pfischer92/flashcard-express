"use strict";

const log4js = require('log4js');
const dotenv = require('dotenv-extended');
const express = require('express');
const mongoose = require('mongoose');
const Questionnaire = require('./domain/questionnaire');


// Read the properties from file '.env' and '.env.defaults'
dotenv.load({silent: true});

// Configure log4js based on the definitions in file 'log4js.json'
log4js.configure('log4js.json');
const logger = log4js.getLogger('app');

// Use native promises, needed with Mongoose since v4.1.0
mongoose.Promise = global.Promise;

// Connect to the database using the connection parameters found in the property-files
const url = 'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE;
logger.debug(`Database URL used "${url}"`);
mongoose.connect(url, {
    useMongoClient: true
});

// Create the Express Server App
const app = express();

// Read PORT from the configuration, default to 8000
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    Questionnaire.find((err, questionnaires) => {
        if (err) {
          return res.status(400).send('database error');
        }
        logger.debug(`Found ${questionnaires.length} questionnaires`);
        res.status(200).json(questionnaires);
      });

    logger.debug("Successfully processed %s request for '%s'", req.method, req.url);
  })

  
// Start the App as HTTP server
app.listen(PORT);

// Use backquotes for the es6 feature
logger.info(`Server started on port ${PORT}`);

module.exports = app;
