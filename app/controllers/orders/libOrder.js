const User = require("../../schema/schemaUser");
const Order = require("../../schema/schemaOrder");
const Product = require("../../schema/schemaProduct");

module.exports = {
  // renvoie un tableau détaillé des ventes
  getMyOrders(req, res) {
    const { phoneNumber } = req.query;

    if (!phoneNumber) {
      return res.status(401).json({
        text: "Numéro de téléphone non reconnu.",
      });
    }

    User.findOne({ phoneNumber: phoneNumber }, "orders", async (err, user) => {
      if (err) console.log("Error ids", err);

      if(!user) return res.status(401).send('User not found')

      let orders = [];
      let nbProducts = 0;
      let totalAmount = 0;
      let currency = "$"
      const promises = user.orders.map(async (orderID) => {
        const order = await Order.findById(orderID);

        if(order) {
            orders.push(order)
            nbProducts += order.cart.length
            totalAmount += order.amount
        }
      })

      await Promise.all(promises);
      res.status(200).send({orders, nbProducts, totalAmount, currency});
    });
  },
};
