const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
  describe('/albums', () => {
    describe('POST', () => {
    let artist
    beforeEach(async () => {
        const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *', [
        'Billie Eilish',
        'Alternative',
        ])
    
        artist = rows[0]
        console.log(artist);
    })

      it('creates a new album in the database', async () => {
        console.log(`/artists/${artist.id}/albums`)
        const { status, body } = await request(app).post(`/artists/${artist.id}/albums`).send({
          name: 'Happier Than Ever',
          year: 2021,
          // artist_id: `${artist.id}`
        })

        expect(status).to.equal(201)
        expect(body.name).to.equal('Happier Than Ever')

        const { rows: [ albumData ] } = await db.query(
          `SELECT * FROM Albums WHERE id = ${body.id}`
        )
        expect(albumData.name).to.equal('Happier Than Ever')
        expect(albumData.year).to.equal(2021)
      });
    });
  });
});