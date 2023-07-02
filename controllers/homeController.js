const User = require("../models/User");

module.exports = async (req, res) => {
  let userData = await User.findById(req.session.userId);
  res.render("home", { userData });
};
