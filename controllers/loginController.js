module.exports = (req, res) => {
  res.render("login", {
    passwordWrong: req.flash("passwordCheck"),
    emailWrong: req.flash("emailCheck"),
  });
};
