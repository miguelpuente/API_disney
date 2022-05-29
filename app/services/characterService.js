const { request, response } = require('express');
const { Character } = require('../models/index');

const getCharacters = async( offset = 0, limit = 10 ) => {

    const characters = await Character.findAll({attributes:['id','image','name']});

    return characters;
}

const getCharacter = async( id ) => {

    const character = await Character.findOne({ where: { id }});

    if (!character){
        throw new Error(`Character not found, may have been removed `);
    }

    return character;
}

const createCharacter = async( req = request ) => {

    const character = new Character();
    character.image = req.body.image;
    character.name = req.body.name;
    character.age = req.body.age;
    character.weight = req.body.weight;
    character.history = req.body.history;
    character.activo = req.body.activo;
    await character.save();

    return character;
}

const editCharacter = async( req = request ) => {

    const { id } = req.params;

    const character = await Character.findOne({ where: { id } });

    if (!character){
        throw new Error(`Character not found, may have been removed `);
    }

    character.image = req.body.image;
    character.name = req.body.name;
    character.age = req.body.age;
    character.weight = req.body.weight;
    character.history = req.body.history;
    await character.save();

    return character;
}

const deleteCharacter = async (req) => {

    const { id } = req.params;
    
    const character = await Character.findOne({ where: { id } });

    if (!character){
        throw new Error(`Character not found `);
    }

    character.destroy();

    return character
}

module.exports = {
    getCharacters,
    getCharacter,
    createCharacter,
    editCharacter,
    deleteCharacter
}