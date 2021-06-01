const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');

mongoose.connect(
    process.env.DB_CONN,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB!')
);

//const mailer = require('./mailer');
//mailer.processMailQueue()

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    } 
    next();
});

app.use('/users', userRoutes);
app.use((req, res, next) => {
    const error = new Error('API route not found!');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});

module.exports = app;
