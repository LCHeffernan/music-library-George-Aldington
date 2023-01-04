const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Artist', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *',
      [1, 'Tame Impala', 'rock']
    );

    artist = rows[0];
  });

  describe('PATCH /artists/{id}', () => {
    it('updates the artist and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/artists/${artist.id}`)
        .send({ name: 'something different', genre: 'rock' });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: artist.id,
        name: 'something different',
        genre: 'rock',
      });
      const {
        rows: [artistData],
      } = await db.query(`SELECT * FROM Artists WHERE id = $1`, [body.id]);
      expect(artistData.name).to.equal('something different');
      expect(artistData.genre).to.equal('rock');
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/artists/999999999')
        .send({ name: 'something different', genre: 'rock' });

      expect(status).to.equal(404);
      expect(body.message).to.equal('artist 999999999 does not exist');
    });
  });
});
