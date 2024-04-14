import * as chai from 'chai';
const expect = chai.expect;

describe('Events', () => {
    it('should get all events', (done) => {
      chai.request(server)
        .get('/api/events')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
