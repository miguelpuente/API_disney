const { request, response } = require('express');
const { getGenres, getGenre, createGenre, editGenre, deleteGenre } = require('../services/genreService');


const all = async(req, res) => {
    try {
        const genres = await getGenres();
        res.json({ genres });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const genre = await getGenre(id);
        res.json({ genre });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const create = async( req = request, res = response) => {
    try {
        const genre = await createGenre(req);
        res.json({ genre });
    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }
}

const edit = async( req = request, res = response) => {
    try {
        const genre = await editGenre(req);
        res.json({ genre });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const delete_ = async(req, res) => {
    try {
        const genre = await deleteGenre(req);
        res.json({ genre });
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