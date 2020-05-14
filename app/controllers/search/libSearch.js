const User = require("../../schema/schemaUser");
const Product = require("../../schema/schemaProduct");

module.exports = {
  searchByProduct(req, res) {
    const { productName } = req.query;

    if (!productName) {
      return res.status(401).json({
        text: "Product name not specified.",
      });
    }

    Product.find({ title: new RegExp(productName, "i"), sold: false }, function (
      err,
      products
    ) {
      if (err) console.log(err);

      res.status(200).json(products);
    });
  },

  searchByUser(req, res) {
    const { userName } = req.query;

    if (!userName) {
      return res.status(401).json({
        text: "Username not specified.",
      });
    }

    User.find(
      {
        $or: [
          { publicName: new RegExp(userName, "i") },
          { firstname: new RegExp(userName, "i") },
          { lastname: new RegExp(userName, "i") },
        ],
      }, "_id firstname lastname publicName profilePicture",
      function (err, users) {
        if (err) console.log(err);

        res.status(200).json(users);
      }
    );
  },

  searchByTag(req, res) {
    const { tag } = req.query;

    if (!tag) {
      return res.status(401).json({
        text: "Tag not specified.",
      });
    }

    Product.find({ tags: new RegExp("^" + tag + "$", "i") }, function(err, products) {
        if(err) console.log(err);

        res.status(200).json(products);
    })
  },
};
