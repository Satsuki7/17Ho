/*
 * GET home page.
 */

exports.title = function (req, res) {
  res.render("1title");
};
exports.lobby = function (req, res) {
  req.session.name = req.body.name;
  res.render("2lobby", { name: req.body.name, session: req.session.name });
};
