const axios = require('axios');
const assert = require('assert');
const request = require('supertest');
const app = require('../utils/testapp');
const CONSTANTS = require('../utils/constants');
const environment = require('../../src/config/environment.config');

describe('Get Classes', () => {
    it('Should get list of classes', (done) => {
        request(app)
            .get('/classes/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Class by ID', () => {

    it('Should get specific class', (done) => {
        request(app)
            .get('/class/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Delete a Class Success', () => {

    it('Should delete a class', (done) => {
        request(app)
            .delete('/class/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Delete a Class Failure', () => {

    it('Should not delete a class', (done) => {
        request(app)
            .delete('/class/a')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Class Failure', () => {
    it('Should not update class', (done) => {
        request(app)
            .put('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.CLASS.UPDATE.FAILURE)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error('The class can not be updated'));
            });
    });
});


