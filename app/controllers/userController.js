/* C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /user */
const account = require("./account/libUser.js");

module.exports = function(app) {
  app.post("/login", account.login);
  app.post("/signup", account.signup);
};
