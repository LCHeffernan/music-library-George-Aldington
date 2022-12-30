const db = require('../db');

const createAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;
  try {
    const { rows: [ album ] } = await db.query(
      `INSERT INTO Albums (artist_id, name, year) VALUES ($1, $2, $3) RETURNING *`,
      [id, name, year]
    );
    console.log(album);
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = createAlbum;