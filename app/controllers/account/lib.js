/*
    Contiendra les fonctions de connexion et de création de compte
*/

const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
  const { firstname, lastname, email, phone, password } = req.body;
  if (!firstname || !lastname || !email || !phone || !password) {
    //Le cas où les paramètres ne serait pas saisis ou nuls
    return res.status(400).json({
      text: "Requête invalide"
    });
  }

  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    firstname,
    lastname,
    email,
    phone,
    password: passwordHash.generate(password)
  };

  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await User.findOne({
      phone,
      email
    });
    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }

  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "Succès",
      token: userObject.getToken()
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  const { phone, password } = req.body;
  if (!phone || !password) {
    // Si phone ou bien le password ne serait pas saisi ou nul
    return res.status(400).json({
      text: "Un des paramètres est manquant !"
    });
  }
  try {
    // On check si l'utilisateur existe en base
    const findUser = await User.findOne({ phone });
    if (!findUser)
      return res.status(401).json({
        text: "L'utilisateur n'existe pas"
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        text: "Mot de passe incorrect"
      });
    return res.status(200).json({
      token: findUser.getToken(),
      text: "Authentification réussie !"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

//On exporte nos deux fonctions
exports.login = login;
exports.signup = signup;
