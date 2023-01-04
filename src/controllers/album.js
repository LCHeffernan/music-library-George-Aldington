const db = require('../db/index');

const createAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;
  try {
    const {
      rows: [album],
    } = await db.query(
      `INSERT INTO Albums (artist_id, name, year) VALUES ($1, $2, $3) RETURNING *`,
      [id, name, year]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readAlbum = async (_req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM Albums`);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [Album],
    } = await db.query(`SELECT * FROM Albums WHERE id = $1`, [id]);

    if (!Album) {
      res.status(404).json({ message: `Album ${id} does not exist` });
    } else {
      res.status(200).json(Album);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateAlbumById = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;

  let statement, inputs;

  if (name && year) {
    statement = `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *`;
    inputs = [name, year, id];
  } else if (name) {
    statement = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING *`;
    inputs = [name, id];
  } else if (year) {
    statement = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING *`;
    inputs = [year, id];
  }

  try {
    const {
      rows: [album],
    } = await db.query(statement, inputs);

    if (!album) {
      return res.status(404).json({ message: `Album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [album],
    } = await db.query(`DELETE FROM Albums WHERE id = $1 RETURNING *`, [id]);

    if (!album) {
      res.status(404).json({ message: `Album ${id} does not exist` });
    } else {
      res.status(200).json(album);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
module.exports = {
  createAlbum,
  readAlbum,
  readAlbumById,
  updateAlbumById,
  deleteAlbum,
};
