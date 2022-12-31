const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('Read Albums', () => {
  let artists
  let albums
  beforeEach(async () => {
    const responses = await Promise.all([
      db.query('INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *', [
        1,
        'Tame Impala',
        'rock',
      ]),
      db.query('INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *', [
        2,
        'Kylie Minogue',
        'pop',
      ]),
      db.query('INSERT INTO Artists (id, name, genre) VALUES( $1, $2, $3) RETURNING *', [
        3,
        'Tame Antelope',
        'jazz',
      ]),
    ])

    artists = responses.map(({ rows }) => rows[0])
    console.log(artists);

    const albums_responses = await Promise.all([
      db.query('INSERT INTO Albums (artist_id, name, year) VALUES ($1, $2, $3) RETURNING *', [
        1,
        'Currents', 
        2015,
      ]),
      db.query('INSERT INTO Albums (artist_id, name, year) VALUES ($1, $2, $3) RETURNING *', [
        2,
        'Light Years', 
        2000,
      ]),
      db.query('INSERT INTO Albums (artist_id, name, year) VALUES ($1, $2, $3) RETURNING *', [
        3,
        'Random Name', 
        2015,
      ]),
    ])

    albums = albums_responses.map(({ rows }) => rows[0])
    console.log(albums);

  })

  describe('GET /albums', () => {
    it('returns all album records in the database', async () => {
      const { status, body } = await request(app).get('/albums').send()

      expect(status).to.equal(200)
      expect(body.length).to.equal(3)

      body.forEach((albumRecord) => {
        const expected = albums.find((a) => a.id === albumRecord.id)

        expect(albumRecord).to.deep.equal(expected)
      })
    })
  })
describe('GET /albums/{id}', () => {
  it('returns the artist with the correct id', async () => {
    const { status, body } = await request(app).get(`/albums/${albums[0].id}`).send()

    expect(status).to.equal(200)
    expect(body).to.deep.equal(albums[0])
  })

  it('returns a 404 if the artist does not exist', async () => {
    const { status, body } = await request(app).get('/albums/999999999').send()

    expect(status).to.equal(404)
    expect(body.message).to.equal('artist 999999999 does not exist')
  })
})
})