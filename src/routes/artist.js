const artistRoute = (req, res) => {
  res.status(201).send(req.body);
};

module.exports = artistRoute;