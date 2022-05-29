const { request, response } = require('express');
const { getMovies, getMovie, createMovie, editMovie, deleteMovie } = require('../services/movieService');


const all = async(req, res) => {
    try {
        const movies = await getMovies();
        res.json({ movies });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const movie = await getMovie(id);
        res.json({ movie });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const create = async( req = request, res = response) => {
    try {
        const movie = await createMovie(req);
        res.json({ movie });
    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }
}

const edit = async( req = request, res = response) => {
    try {
        const movie = await editMovie(req);        
        res.json({ movie });
    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }
}

const delete_ = async(req, res) => {
    try {
        const movie = await deleteMovie(req);
        res.json({ movie });
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