const util = require("util");
const fs = require('fs')

function removeFile(name){
    try{
        fs.unlinkSync(`${__basedir}/resources/static/assets/uploads/${name}`)
        console.log(`Arquivo ${name} Removido com Sucesso!`)
    }catch(e){
        console.log(e)
    }
}

let remove = util.promisify(removeFile);
module.exports = remove;