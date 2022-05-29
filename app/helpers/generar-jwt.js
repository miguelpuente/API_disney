const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload,  authConfig.secret, {
            expiresIn: authConfig.expires
        }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject( 'The token could not be generated.');
            } else {
                resolve( token );
            }
        })
    });

}

module.exports = {
    generarJWT
}