import * as chai from 'chai';
const expect = chai.expect;
import { app } from '../src/server.js';

describe('Array', function () {
    it('should start empty', function () {
        const arr = [];
        expect(arr).to.be.empty;
    });
});
