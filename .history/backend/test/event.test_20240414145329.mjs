import * as chai from 'chai';
const expect = chai.expect;
import { app } from '../src/server.js';

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
