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

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("User", userSchema);
