const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Artist', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (id, name, genre) VALUES($1, $2, $3) RETURNING *',
      [1, 'Tame Impala', 'rock']
    );

    artist = rows[0];
  });

  describe('DELETE /artists/{id}', () => {
    it('deletes the artist and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/artists/${artist.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({ id: 1, name: 'Tame Impala', genre: 'rock' });
      const {
        rows: [artistData],
      } = await db.query(`SELECT * FROM Artists WHERE id = $1`, [body.id]);
      expect(artistData).to.be.undefined;
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app)
        .delete('/artists/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('artist 999999999 does not exist');
    });
  });
});
