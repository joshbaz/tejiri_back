const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

//import the cookie-session
const cookieSession = require('cookie-session');

//importation of the passport-library
const passport = require('passport');
require('./services/passport');
//importation of the routes
const userRoutes = require('./api/routes/user');
const googleRoute = require('./api/routes/googleRoute');
const imageRoute = require('./api/routes/images');
const folderRoute = require('./api/routes/folder');
const assignmentRoute = require('./api/routes/assignment');


require('dotenv').config()

/*

 ** Database connection

 */

 mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGO_URI,
    {
     useNewUrlParser: true,
     useUnifiedTopology:true
 });
mongoose.set('useCreateIndex', true);

 const conn = mongoose.connection;
 conn.on('error', console.error.bind(console, 'connection error:'));
 conn.once('open', () => {
     console.log('connected to a database')
 });



app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'PATCH', 'POST', 'DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
});

app.get('/', (req, res, next) => {
    res.send('ALERO - FAITHFULLY MOVING');
});

//this runs a configuration object
app.use(cookieSession({
    //this configuration object represents 
    //howlong the cookie should last
    //30 days, then 24 hours, then 60 minutes, then 60 seconds, then miliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //encryption of our cookie key
    keys: [process.env.cookieKey]
})
);

//passport to use cookies for authentification
app.use(passport.initialize());
app.use(passport.session());

/************************************** */
app.use('/folder', folderRoute);
app.use('/assignment', assignmentRoute);
app.use('/image', imageRoute);
app.use('/users', userRoutes);
googleRoute(app);
//request-response call absent 
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
}); 
module.exports = app;