process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');
describe('routes : notes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/v1/notes', () => {
    it('should return all notes', (done) => {
      chai.request(server)
        .get('/api/v1/notes')
        .end((err, res) => {

          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(3);
          res.body.data[0].should.include.keys(
            'id', 'title', 'author', 'journal'
          );
          done();
        });
    });
  });
  describe('GET /api/v1/notes/:id', () => {
    it('should get a single note', (done) => {
      chai.request(server)
        .get('/api/v1/notes/3')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys(
            'id', 'title', 'author', 'journal', 'created_at'
          );
          done();
        });
    });
  });
  it('should throw an error if a note does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/notes/9999999')
      .end((err, res) => {
        should.exist(err);
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('The note does not exist');
        done();
      });
  });
});
  describe('POST /api/v1/notes', () => {
    it('should return the new added note', (done) => {
      chai.request(server)
        .post('/api/v1/notes')
        .send({
          title: 'Resolutions...another year?',
          author: 'Mike Jatelo',
          journal: 'Another year, time for more resoutions. What happened to last years though?...'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys(
            'id', 'title', 'author', 'journal'
          );
          done();
        });
    });
    it('should throw an error if the payload is malformed', (done) => {
      chai.request(server)
        .post('/api/v1/notes')
        .send({
          title: 'Change is good'
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          should.exist(res.body.message);
          done();
        });
    });
  });
  describe('PUT /api/v1/notes', () => {
    it('should return an updated note', (done) => {
      knex('notes')
        .select('*')
        .then((note) => {
          const originalNote = note[0];
          chai.request(server)
            .put(`/api/v1/note/${originalNote.id}`)
            .send({
              title: 'Adventures in Watamu'
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('success');
              res.body.data[0].should.include.keys(
                'id', 'title', 'author', 'journal'
              );
              const updatedNote = res.body.data[0];
              updatedNote.title.should.not.eql(originalNote.title);
              done();
            });
        });
    });
  });


