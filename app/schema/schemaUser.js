/*****************************************************************************************************************/
/* Schéma du modèle User
/* Un numéro de téléphone & un password
/* Méthodes : 
/*  - authenticate(pwd) : vérifier si le password est bien associé au numéro de l'utilisateur
/*  - getToken() : génère un jeton d'accès à partir du modèle et de notre chaine de caractères secrète (/config)
/****************************************************************************************************************/
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Validation du numéro de téléphone avec le plugin libphonenumber (Google) */
var mongooseIntlPhoneNumber = require("mongoose-intl-phone-number");
/* Validation de l'email */
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "L'adresse email est invalide.";

var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    // création du compte avec données de base
    firstname: {
      type: String,
      trim: true,
      required: true,
      match: [/^[a-zA-Z]+$/, "must be only letters"]
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      match: [/^[a-zA-Z]+$/, "must be only letters"]
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },

    // customisation du profil
    profilePicture: [],
    publicName: String,
    bio: String,
    linkFB: String,
    linkInstagram: String,
    city: String,
    country: String,

    // produits uploadés et mis en vente
    myProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    // panier courant
    cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    // favoris courant
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    // tous les produits achetés
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    // tous les produits vendus
    sold: [{ type: Schema.Types.ObjectId, ref: "Sold" }],

    // les User ayant utilisé son code de parrainage
    affiliates: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // le code parrain donné à cet User
    codeParrain: String
  },
  { timestamps: true, runSettersOnQuery: true }
);

/* For validation of real and valid phone numbers (unpleasant when testing the API...) */
/*
userSchema.plugin(mongooseIntlPhoneNumber, {
  hook: "validate",
  phoneNumberField: "phoneNumber",
  nationalFormatField: "nationalFormat",
  internationalFormat: "internationalFormat",
  countryCodeField: "countryCode"
});
*/

/* adds pre-save validation for UNIQUE fields within a Mongoose schema. (email, phoneNumber in our case) */
userSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

module.exports = mongoose.model("User", userSchema);
