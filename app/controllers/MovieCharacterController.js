const { request, response } = require('express');
const { getMovieCharacters, getMovieCharacter, createMovieCharacter, editMovieCharacter, deleteMovieCharacter } = require('../services/moviecharacterService');
const {Movie} = require('../models/')

const all = async(req, res) => {
    try {
        const moviecharacters = await getMovieCharacters();
        res.json({ moviecharacters });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const moviecharacter = await getMovieCharacter(id);
        res.json({ moviecharacter });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const create = async( req = request, res = response) => {
    try {
        const moviecharacter = await createMovieCharacter(req);
        res.json({ moviecharacter });
    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }
}

const edit = async( req = request, res = response) => {
    try {
        const moviecharacter = await editMovieCharacter(req);        
        res.json({ moviecharacter });
    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }
}

const delete_ = async(req, res) => {
    try {
        const moviecharacter = await deleteMovieCharacter(req);
        res.json({ moviecharacter });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    all,
    create,
    edit,
    show,
    delete_
}