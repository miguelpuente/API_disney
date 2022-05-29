const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require ('uuid');


const subirArchivo = (files, extensionesValidas = ['png','jpg','jpeg','pdf'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado [nombreCortado.length - 1 ];

        //validar extensión
        if ( !extensionesValidas.includes(extension) ){
            return reject(`The extension ${ extension } is not allowed, the following extensions are valid: ${ extensionesValidas }`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve( nombreTemp );
        });
    });
}

const actualizarArchivo = async (files, extensionesValidas, modelo, id, carpeta ) => {

    if (!files || Object.keys(files).length === 0 || !files.archivo ) {
        
        return { ok: false, msg:'There are no files to upload'  };
    }

    try {

        const instancia = await modelo.findByPk(id);

        // limpiar archivos previas

        if ( instancia.img ) {
            
            const pathArchivo = path.join(__dirname, '../uploads', instancia.img )

            if ( fs.existsSync(pathArchivo) ) {
                fs.unlinkSync( pathArchivo );
            }
        }

        const nombre = await subirArchivo( files, extensionesValidas, carpeta );
        instancia.img = carpeta+'/'+nombre;
        await instancia.save();

        return { ok: true, nombre:instancia.img  }
        
    } catch (error) {

        return { ok: false, msg: error }
    }

}

module.exports = {
    subirArchivo,
    actualizarArchivo
}