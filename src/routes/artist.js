const db = require('../db/index');

const createArtistRoute = async (req, res) => {
    const { name, genre } = req.body
    console.log("hello");
    try {
      const { rows: [ artist ] } = await db.query(`INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`, [name, genre])
      res.status(201).json(artist)
    } catch (err) {
      res.status(500).json(err.message)
    }
  };

const findArtistRoute = async (_req, res) => {
  try{ 
  const { rows } = await db.query('SELECT * FROM Artists');
  console.log(rows)
  res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const findArtistByIdRoute = async(req, res) => {
  const { id } = req.params
  try {
  const { rows } = await db.query(`SELECT * FROM Artists WHERE id = '${id}'`);
  console.log(rows);
  const artist = rows[0];
    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ message: `artist ${id} does not exist` });
    }
  
  } catch (err) {
    res.send(500).json(err.message)
  }
};

module.exports = { createArtistRoute, findArtistRoute, findArtistByIdRoute };