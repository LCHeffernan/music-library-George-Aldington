const db = require('../db/index');

const artistRoute = async (req, res) => {
    const { name, genre } = req.body
  
      const { rows: [ artist ] } = await db.query(`INSERT INTO Artists (name, genre) VALUES ('${name}', '${genre}') RETURNING *`)
      res.status(201).json(artist)
  };

module.exports = artistRoute;