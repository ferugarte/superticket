import * as chai from 'chai';
import * as app from '../src/server.js';
import * as chaiHttp from 'chai-http';
const expect = chai.expect;
chai.use(chaiHttp);

describe('Array', function () {
    it('should start empty', function () {
        const arr = [];
        expect(arr).to.be.empty;
    });
});

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
