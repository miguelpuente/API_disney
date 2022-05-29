const { request, response } = require('express');
const { MovieCharacter, Movie } = require('../models/index');

const getMovieCharacters = async( offset = 0, limit = 10 ) => {

    const moviecharacters = await MovieCharacter.findAll();

    return moviecharacters;
}

const getMovieCharacter = async( id ) => {

    const moviecharacter = await MovieCharacter.findOne({ where: { id } });

    if (!moviecharacter){
        throw new Error(`MovieCharacter not found, may have been removed `);
    }

    return moviecharacter;
}

const createMovieCharacter = async( req = request ) => {

    const moviecharacter = new MovieCharacter();
    moviecharacter.movieId = req.body.movieId;
    moviecharacter.characterId = req.body.characterId;
    await moviecharacter.save();

    return moviecharacter;
}

const editMovieCharacter = async( req = request ) => {

    const { id } = req.params;

    const moviecharacter = await MovieCharacter.findOne({ where: { id } });

    if (!moviecharacter){
        throw new Error(`MovieCharacter not found, may have been removed `);
    }

    moviecharacter.movieId = req.body.movieId;
    moviecharacter.characterId = req.body.characterId;
    await moviecharacter.save();

    return moviecharacter;
}

const deleteMovieCharacter = async (req) => {

    const { id } = req.params;
    
    const moviecharacter = await MovieCharacter.findOne({ where: { id } });

    if (!moviecharacter){
        throw new Error(`MovieCharacter not found `);
    }

    moviecharacter.destroy();

    return moviecharacter
}

module.exports = {
    getMovieCharacters,
    getMovieCharacter,
    createMovieCharacter,
    editMovieCharacter,
    deleteMovieCharacter
}