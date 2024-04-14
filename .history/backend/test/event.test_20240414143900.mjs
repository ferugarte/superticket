import * as chai from 'chai';
import * as server from '../server'; // make sure this is the right path to your server file

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
