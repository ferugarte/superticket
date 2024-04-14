// Example test for getting all events
import('chai').then(chai => {
    const expect = chai.expect;
    const chaiHttp = require('chai-http');
    const server = require('../server'); // make sure this is the right path to your server file
    chai.use(chaiHttp);
    chai.should();

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
});

