const uploadFile = require("../middleware/upload");
const remove = require('../middleware/remove')
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if(req.files.length < 1){
      return res.status(400).send({ message: "Please select a file to upload!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully!",
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file!`,
    });
  }
};

const removeFile = async (req, res) => {
  try{
    fs.unlinkSync(`${__basedir}/resources/static/assets/uploads/${req.params.name}`)
    res.status(200).send('Arquivo Removido com Sucesso!')
  }catch(e){
    res.status(400).send(e)
  }
}

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
  removeFile
};
