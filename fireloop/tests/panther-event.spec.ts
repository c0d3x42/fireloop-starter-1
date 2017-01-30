var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('PantherEvent unit tests:', () => {
    it('Should create a PantherEvent instance', (done: Function) => {
        api.post('/panther-events').send({
            message: 'test'
        }).expect(200, done);
    });
});
