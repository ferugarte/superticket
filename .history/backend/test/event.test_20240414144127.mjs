import * as chai from 'chai';
import chaiHttp from 'chai-http';
import * as server from '../src/server.js'; // make sure this is the right path to your server file

const { expect } = chai;
chai.use(chaiHttp);
describe('POST /api/events', () => {
    it('should create a new event', done => {
        const event = {
            name: "New Year's Eve",
            description: "Annual New Year's celebration.",
            date: "2023-12-31",
            time: "23:59",
            location: { lat: 40.7128, lng: -74.0060 },
            zones: [{ name: "VIP", price: 100, capacity: 50 }]
        };
        chai.request(app)
            .post('/api/events')
            .send(event)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.data.name).to.equal(event.name);
                done();
            });
    });
});

