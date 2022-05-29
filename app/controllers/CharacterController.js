const { request, response } = require('express');
const { getCharacters, getCharacter, createCharacter, editCharacter, deleteCharacter } = require('../services/characterService');


const all = async(req, res) => {
    try {
        const characters = await getCharacters();
        res.json({ characters });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const show = async(req, res) => {
    const { id } = req.params;
    try {
        const character = await getCharacter(id);
        res.json({ character });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const create = async( req = request, res = response) => {
    try {
        const character = await createCharacter(req);
        res.json({ character });
    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }
}

const edit = async( req = request, res = response) => {
    try {
        const character = await editCharacter(req);        
        res.json({ character });
    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }
}

const delete_ = async(req, res) => {
    try {
        const character = await deleteCharacter(req);
        res.json({ character });
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