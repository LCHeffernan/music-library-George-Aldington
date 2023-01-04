const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Albums', () => {
  let artists;
  let albums;
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
        [1, 1, 'Currents', 2015]
      ),
    ]);

    albums = albums_responses.map(({ rows }) => rows[0]);
  });

  describe('DELETE /albums/{id}', () => {
    it('deletes the album and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${albums[0].id}`)
        .send();
      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: albums[0].id,
        artist_id: artists[0].id,
        name: 'Currents',
        year: 2015,
      });
      const {
        rows: [artistData],
      } = await db.query(`SELECT * FROM Albums WHERE id = $1`, [body.id]);
      expect(artistData).to.be.undefined;
    });
  });
  it('returns a 404 if the album does not exist', async () => {
    const { status, body } = await request(app)
      .delete('/albums/999999999')
      .send();

    expect(status).to.equal(404);
    expect(body.message).to.equal('Album 999999999 does not exist');
  });
});
