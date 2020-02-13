/*
    Contiendra les fonctions de connexion et de création de compte
*/

const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");

async function signup(req, res) {
  const { firstname, lastname, email, phoneNumber, password } = req.body;
  if (!firstname || !lastname || !password) {
    //Le cas où les paramètres ne serait pas saisis ou nuls
    return res.status(400).json({
      text: "Les champs ne sont pas tous saisis."
    });
  }
  if (!email) {
    return res.status(400).json({
      text: "Veuillez renseignez un email valide."
    });
  }
  if (!phoneNumber) {
    return res.status(400).json({
      text: "Veuillez renseignez un numéro de téléphone valide."
    });
  }

  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    firstname,
    lastname,
    email,
    phoneNumber,
    password: passwordHash.generate(password)
  };

  // On check en base si l'utilisateur existe déjà selon son email et numéro de téléphone
  try {
    const findUser = await User.findOne({ email, phoneNumber });
    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà"
      });
    }
  } catch (error) {
    return res.status(500).json({
      text: "Erreur lors du check de la base de données.",
      error: error.message
    });
  }

  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    if (!userData) {
      return res.status(400).json({
        text: "Le nouvel objet User n'a pas été crée."
      });
    }

    const userObject = await userData.save();
    return res.status(200).json({
      text: "Succès : User saved successfully! :)",
      token: userObject.getToken()
    });
  } catch (error) {
    return res.status(500).json({
      text: "Erreur interne lors de la sauvegarde de l'utilisateur en base.",
      error: error.message
    });
  }
}

async function login(req, res) {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    // Si phoneNumber ou bien le password ne serait pas saisi ou nul
    return res.status(400).json({
      text: "Un des paramètres est manquant !"
    });
  }
  try {
    // On check si l'utilisateur existe en base
    const findUser = await User.findOne({ phoneNumber });
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
