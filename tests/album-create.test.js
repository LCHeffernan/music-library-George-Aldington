const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
  describe('/albums', () => {
    describe('POST', () => {
      let artist;
      beforeEach(async () => {
        const { rows } = await db.query(
          'INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *',
          [1, 'Billie Eilish', 'Alternative']
        );

        artist = rows[0];
      });

      it('creates a new album in the database', async () => {
        console.log(`/artists/${artist.id}/albums`);
        const { status, body } = await request(app)
          .post(`/artists/${artist.id}/albums`)
          .send({
            name: 'Happier Than Ever',
            year: 2021,
          });

        expect(status).to.equal(201);
        expect(body.name).to.equal('Happier Than Ever');

        const {
          rows: [albumData],
        } = await db.query(`SELECT * FROM Albums WHERE id = $1`, [body.id]);
        expect(albumData.name).to.equal('Happier Than Ever');
        expect(albumData.year).to.equal(2021);
      });
    });
  });
});
