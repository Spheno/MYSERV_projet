const fs = require("fs");
const path = require("path");

module.exports = {
  // on récupère les images d'un produit
  getProductPictures(req, res) {
    const { phoneNumber, productTitle } = req.query;

    if (!phoneNumber) {
      return res.status(401).json({
        text: "Numéro de téléphone non reconnu."
      });
    }

    if (!productTitle) {
      return res.status(401).json({
        text: "Nom du produit non reconnu."
      });
    }

    const uploadDir = path.join(
      __dirname,
      "../../client/public/uploads/",
      phoneNumber,
      productTitle
    );

    const imgPath = path.join("uploads", phoneNumber, productTitle)

    console.log("uploadDir", uploadDir);
    const productFiles = [];

    fs.readdir(uploadDir, function(err, files) {
      if (err) {
        return res.status(401).json({
          text: "Impossible d'accéder au répertoire." + err
        });
      }

      files.forEach(function(file) {
        productFiles.push(file);
      });

      res.status(200).send({name: productFiles, path: imgPath});
    });
  }
};
