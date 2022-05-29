const { User } = require("../models/index");

const existeUsuarioPorId = async( id = '' ) => {
    
    const usuario = await User.findByPk( id );

    if ( !usuario ) {
        throw new Error(`The user with the id ${ id } does not exist.`);
    }

}

const existeEmail = async( email = '' )=>{

    const existeEnDB = await User.findOne({ where:{ email } });

    if ( existeEnDB ) {
        throw new Error(`Email ${ email } already exists`);
    }

}


/** 
*   Validar Colecciones permitidas
*/

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if ( !incluida ){
        throw new Error(`The collection ${ coleccion } is not allowed, ${ colecciones }`);
    }
    return true;
}

module.exports = {
    existeUsuarioPorId,
    existeEmail,
    coleccionesPermitidas,
}