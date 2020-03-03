/*
    Contiendra les fonctions de :,
      - de récupération de tous les produits;
      - de récupération d'un produit.
*/
const Product = require("../../schema/schemaProduct");

module.exports = {
  getAllProducts(req, res, next) {
    let perPage = 9;
    let page = parseInt(req.query.page) || 1;
    let pages = 0;
    let nextUrl = "";
    let prevUrl = "";
    Product.estimatedDocumentCount().exec(function(err, count) {
      Product.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec(function(err, products) {
          if (err) console.log("Get Product Mongoose Error: ", err);

          pages = Math.floor(count / perPage);
          if (page === 1) {
            res.status(200).json({
              products,
              currentPage: page,
              pages,
              count,
              prevUrl: ``,
              nextUrl: process.env.REACT_APP_PUBLIC_URL + `/products?page=${page + 1}`
            });
          } else if (page === pages - 1) {
            res.status(200).json({
              products: products,
              currentPage: page,
              pages,
              count,
              prevUrl: process.env.REACT_APP_PUBLIC_URL + `/products?page=${page - 1}`,
              nextUrl: ``
            });
          } else if (page > 1 && page < pages) {
            res.status(200).json({
              products: products,
              currentPage: page,
              pages,
              count,
              prevUrl: process.env.REACT_APP_PUBLIC_URL + `/products?page=${page - 1}`,
              nextUrl: process.env.REACT_APP_PUBLIC_URL + `/products?page=${page + 1}`
            });
          } else {
            res.redirect("/products");
          }
        });
    });
  },

  getProduct(req, res, next) {
    const { id } = req.params;
    Product.findById(id).exec((err, product) => {
      if (err) return console.log("error getProductByID: ", err);

      console.log("success getProductByID!");
      res.status(200).json({ product });
    });
  }
};
