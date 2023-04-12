const axios = require('axios')
const https = require('https')

const teste = async (req, res) => {


    try{
        const { data } = await axios.get(`https://erp.nita.com.br/api/sec/v1/fornecedores`,{headers: { Authorization: "Basic ZWFpOmJGaDIwNEElS1ZlZg==" }})
        console.log(data)
        return res.status(200).json(data)
    }catch(e){
        console.log(e)
        return res.status(400).json(e)
    }
  };

  module.exports = {
    teste
  };
  