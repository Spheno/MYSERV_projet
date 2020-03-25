// Variables d'environnements
require("dotenv").config();

//Définition des modules
const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  path = require("path")
  
//Connexion à la base de donnée
mongoose
  .connect(process.env.REACT_APP_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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

// Cookies pour un user
app.use(
  session({
    //Create a secret for the cookie store it in .env file
    secret: process.env.REACT_APP_SESSION_SECRET,
    //this for resaving the cookie false, if true can cause a memory leak.
    resave: false,
    //saveUnitialized best false, unless connect to a database.
    saveUninitialized: false,
    cookie: {
      //The max age of the cookie
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

// routes statiques pour charger les images uploadées
app.use(express.static(path.join(__dirname, 'client', 'public')))

// Hello World
app.get("/hello", function(req, res) {
  res.json("Hello World");
});

// Fakerjs : fausses données temporaires pour remplir la base de données
var seeder = require(__dirname + "/seeder/products.js");
app.use("/seeder", seeder);

//Définition des controllers  et des routes associées
var userRouter = require(__dirname + "/controllers/userController");
app.use("/user", userRouter);

var productController = require(__dirname + "/controllers/productController");
app.use("/products", productController);

var categoryController = require(__dirname + "/controllers/categoryController");
app.use("/categories", categoryController);

var uploadsController = require(__dirname + "/controllers/uploadsController")
app.use("/uploads", uploadsController)

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));
