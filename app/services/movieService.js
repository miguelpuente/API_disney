const { request, response } = require('express');
const { Movie, MovieCharacter } = require('../models/index');

const getMovies = async( offset = 0, limit = 10 ) => {

    const movies = await Movie.findAll({attributes:['id','image','title','creation_date']});

    return movies;
}

const getMovie = async( id ) => {

    const movie = await Movie.findOne({ where: { id } });

    if (!movie){
        throw new Error(`Movie not found, may have been removed `);
    }

    return movie;
}

const createMovie = async( req = request ) => {

    const movie = new Movie();
    movie.image = req.body.image;
    movie.title = req.body.title;
    movie.creation_date = req.body.creation_date;
    movie.qualification = req.body.qualification;
    movie.genreId = req.body.genreId;
    await movie.save();

    return movie;
}

const editMovie = async( req = request ) => {

    const { id } = req.params;

    const movie = await Movie.findOne({ where: { id } });

    if (!movie){
        throw new Error(`Movie not found, may have been removed `);
    }

    movie.image = req.body.image;
    movie.title = req.body.title;
    movie.creation_date = req.body.creation_date;
    movie.qualification = req.body.qualification;
    movie.genreId = req.body.genreId;
    await movie.save();

    return movie;
}

const deleteMovie = async (req) => {

    const { id } = req.params;
    
    const movie = await Movie.findOne({ where: { id } });

    if (!movie){
        throw new Error(`Movie not found `);
    }

    movie.destroy();

    return movie
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    editMovie,
    deleteMovie
}