require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models/index');
const  errorMiddleware  = require('../app/middlewares/errors');
require('express-async-errors');


// Setting
const PORT = process.env.PORT || 8080;

// Para poder rellenar el req.body
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

//Middleware
app.use( cors() );
app.use( express.static('public') );

// Rutas
app.use('/auth', require('./routes/auth'));
app.use('/characters', require('./routes/charactersRoute'));
app.use('/genres', require('./routes/genresRoute'));
app.use('/movies', require('./routes/moviesRoute'));
app.use('/moviecharacters', require('./routes/moviecharactersRoute'));
app.use('/users', require('./routes/usersRoute'));

app.use(errorMiddleware);

app.listen( PORT, () => {
    console.log(`Application started on the port ${ PORT }`);

    sequelize.authenticate().then(()=>{
        console.log('Established connection DB');
    }).catch( (error) =>{
        console.log( 'error', error.original )
    });

});