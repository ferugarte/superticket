import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import * as app from '../src/server.js'; // adjust the path to your Express app

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /api/events', () => {
    it('should get all events', done => {
        chai.request(app)
            .get('/api/events')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
});



