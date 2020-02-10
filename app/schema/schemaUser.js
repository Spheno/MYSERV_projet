/*****************************************************************************************************************/
/* Schéma du modèle User
/* Un numéro de téléphone & un password
/* Méthodes : 
/*  - authenticate(pwd) : vérifier si le password est bien associé au numéro de l'utilisateur
/*  - getToken() : génère un jeton d'accès à partir du modèle et de notre chaine de caractères secrète (/config)
/****************************************************************************************************************/

import { Schema, model } from "mongoose";
import { verify } from "password-hash";
import { encode } from "jwt-simple";
import { secret } from "../config/config";

const userSchema = Schema(
  {
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
    return verify(password, this.password);
  },
  getToken: function() {
    return encode(this, secret);
  }
};

export default model("User", userSchema);