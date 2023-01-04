const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Albums', () => {
  let artists;
  let album;
  beforeEach(async () => {
    const responses = await Promise.all([
      db.query(
        'INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *',
        [1, 'Tame Impala', 'rock']
      ),
    ]);

    artists = responses.map(({ rows }) => rows[0]);

    const albums_responses = await Promise.all([
      db.query(
        'INSERT INTO Albums (id, artist_id, name, year) VALUES ($1, $2, $3, $4) RETURNING *',
        [1, artists[0].id, 'Currents', 2015]
      ),
    ]);

    album = albums_responses.map(({ rows }) => rows[0]);
  });

  describe('PATCH /albums/{id}', () => {
    it('returns the album with corrected information', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album[0].id}`)
        .send({ name: 'something different', year: 1998 });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album[0].id,
        artist_id: artists[0].id,
        name: 'something different',
        year: 1998,
      });
      const {
        rows: [artistData],
      } = await db.query(`SELECT * FROM Albums WHERE id = $1`, [body.id]);
      expect(artistData.name).to.equal('something different');
      expect(artistData.year).to.equal(1998);
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/999999999')
        .send({ name: 'something different' });

      expect(status).to.equal(404);
      expect(body.message).to.equal('Album 999999999 does not exist');
    });
  });
});
