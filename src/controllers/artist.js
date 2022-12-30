const db = require('../db/index');

const createArtist = async (req, res) => {
    const { name, genre } = req.body;
    console.log("hello");
    try {
      const { rows: [ artist ] } = await db.query(`INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`, [name, genre])
      res.status(201).json(artist)
    } catch (err) {
      res.status(500).json(err.message)
    }
  };

const findArtist = async (_req, res) => {
  try{ 
  const { rows } = await db.query('SELECT * FROM Artists');
  console.log(rows)
  res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const findArtistById = async(req, res) => {
  const { id } = req.params;
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

const updateArtist = async(req, res) => {
  const { id } = req.params
  const { name, genre } = req.body
  
  let statement, inputs;
  
  if (name && genre) {
      statement = `UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`
      inputs = [name, genre, id]
  } else if (name) {
      statement = `UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *`
      inputs = [name, id]
  } else if (genre) {
      statement = `UPDATE Artists SET genre = $1 WHERE id = $2 RETURNING *`
      inputs = [genre, id]
  }

  try {

    const { rows: [ artist ] } = await db.query(statement, inputs)
    
    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    } 

    res.status(200).json(artist);
  
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
};


const deleteArtist = async(req, res) => {
  const { id } = req.params;
  try {
  const { rows: [ artist ] } = await db.query(`DELETE FROM Artists WHERE id = '${id}' RETURNING *`);

    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ message: `artist ${id} does not exist` });
    }
  
  } catch (err) {
    res.send(500).json(err.message)
  }
};

module.exports = { createArtist, findArtist, findArtistById, updateArtist, deleteArtist };