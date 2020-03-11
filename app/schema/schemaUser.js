/*****************************************************************************************************************/
/* Schéma du modèle User
/* Un numéro de téléphone & un password
/* Méthodes : 
/*  - authenticate(pwd) : vérifier si le password est bien associé au numéro de l'utilisateur
/*  - getToken() : génère un jeton d'accès à partir du modèle et de notre chaine de caractères secrète (/config)
/****************************************************************************************************************/
const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

/* Validation du numéro de téléphone avec le plugin libphonenumber (Google) */
var mongooseIntlPhoneNumber = require("mongoose-intl-phone-number");
/* Validation de l'email */
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = "L'adresse email est invalide.";

var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
  {
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
    profilePicture: {
      type: String
    },
    orders: [],
    affiliates: [], // les User ayant utilisé son code de parrainage
    codeParrain: String,
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
userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

userSchema.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("User", userSchema);
