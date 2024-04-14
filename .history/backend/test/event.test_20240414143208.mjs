import * as chai from 'chai';
const expect = chai.expect;

describe('Array', function () {
    it('should start empty', function () {
        const arr = [];
        expect(arr).to.be.empty;
    });
});
