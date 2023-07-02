const User = require("../models/User");

module.exports = async (req, res) => {
  await User.create(req.body)
    .then(() => {
      console.log("User registered successfully");
      res.redirect("/");
    })
    .catch((error) => {
      // console.log(error);
      if (error) {
        const validationErrors = Object.keys(error.errors).map(
          (key) => error.errors[key].message
        );
        req.flash("data", req.body);
        req.flash("validationErrors", validationErrors);
        return res.redirect("/register");
      }
    });
};
