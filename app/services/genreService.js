const { request, response } = require('express');
const { Genre, Movie } = require('../models/index');

const getGenres = async( offset = 0, limit = 10 ) => {

    const genres = await Genre.findAll({include: { model:Movie, attributes:['id','title'] }});

    return genres;
}

const getGenre = async( id ) => {

    const genre = await Genre.findOne({ where: { id }, include: { model: Movie, attributes:['id','title'] } });

    if (!genre){
        throw new Error(`Genre not found, may have been removed `);
    }

    return genre;
}

const createGenre = async( req = request ) => {

    const genre = new Genre();
    genre.name = req.body.name;
    genre.image = req.body.image;
    await genre.save();

    return genre;
}

const editGenre = async( req = request ) => {

    const { id } = req.params;

    const genre = await Genre.findOne({ where: { id } });

    if (!genre){
        throw new Error(`Genre not found, may have been removed `);
    }

    genre.name = req.body.name;
    genre.image = req.body.image;
    await genre.save();

    return genre;
}

const deleteGenre = async (req) => {

    const { id } = req.params;
    
    const genre = await Genre.findOne({ where: { id } });

    if (!genre){
        throw new Error(`Genre not found `);
    }

    genre.destroy();

    return genre
}

module.exports = {
    getGenres,
    getGenre,
    createGenre,
    editGenre,
    deleteGenre
}