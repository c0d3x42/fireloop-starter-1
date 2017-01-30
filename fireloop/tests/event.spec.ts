var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Event unit tests:', () => {
    it('Should create a Event instance', (done: Function) => {
        api.post('/events').send({
            message: 'test',
            severity: 12345
        }).expect(200, done);
    });
});
