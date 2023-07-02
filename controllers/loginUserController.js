const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      let cmp = bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          req.session.userId = user._id;
          res.redirect("/home");
        } else {
          if (password != user.password) {
            const passwordCheck = "Password is not correct.";
            req.flash("passwordCheck", passwordCheck);
            return res.redirect("/login");
          }
        }
      });
    } else {
      const emailCheck = "Don't have email in this server.";
      req.flash("emailCheck", emailCheck);
      return res.redirect("/login");
    }
  });
};
