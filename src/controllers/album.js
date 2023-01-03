const db = require('../db/index');

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

const readAlbum = async (req, res) => {
  try {
        const { rows } = await db.query(
    `SELECT * FROM Albums`
  );
  console.log(rows);
  res.status(200).json(rows);
} catch (err) {
    res.status(500).json(err.message);
  }
};

const readAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
      const { rows: [Album] } = await db.query(`SELECT * FROM Albums WHERE id = $1`, [id]);
      
      if (!Album) {
        res.status(404).json({ message: `Album ${id} does not exist` });
      } else {
        res.status(200).json(Album);
      }
    } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports =  { createAlbum, readAlbum, readAlbumById };