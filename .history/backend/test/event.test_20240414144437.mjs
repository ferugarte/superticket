import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import * as pkg from '../src/server.js';
const { app } = pkg; // make sure this is the right path to your server file

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


