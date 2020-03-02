//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Connexion à la base de donnée
mongoose
  .connect("mongodb://localhost/shoofly", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(e => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Hello World
app.get("/hello", function(req, res) {
  res.json("Hello World");
});

var seeder = require(__dirname + "/seeder/products.js");
app.use("/seeder", seeder);

//Définition du routeur
var userRouter = require(__dirname + "/controllers/userController");
app.use("/user", userRouter);

var cartRouter = require(__dirname + "/controllers/cartController");
app.use("/cart", cartRouter);

var productController = require(__dirname + "/controllers/productController");
app.use("/products", productController);

var categoryController = require(__dirname + "/controllers/categoryController");
app.use("/categories", categoryController);

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));
