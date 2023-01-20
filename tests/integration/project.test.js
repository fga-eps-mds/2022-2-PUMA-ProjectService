/* eslint-disable */
const axios = require('axios');
const assert = require('assert');
const request = require('supertest');
const app = require('../utils/testapp');
const CONSTANTS = require('../utils/constants');
const environment = require('../../src/config/environment.config');

environment.configEnv();

describe('Register Project Success', () => {
    it('Should register project', (done) => {
        request(app)
            .post('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.REGISTER.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Register Project Failure', () => {
    it('Should not register project', (done) => {
        request(app)
            .post('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.REGISTER.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Project Success', () => {
    it('Should update project', (done) => {
        request(app)
            .put('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.UPDATE.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Update Project Failure', () => {
    it('Should not update project', (done) => {
        request(app)
            .put('/project')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.UPDATE.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error('The project has been updated'));
            });
    });
});

describe('Get Success Keywords Availble To Project', () => {
    it('Should get keywords availble to project', (done) => {
        request(app)
            .get('/project/keywords')
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

describe('Professor Evaluate Project Success', () => {
    it('Should Evaluate the project', (done) => {
        request(app)
            .put('/project/evaluate')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.EVALUATE.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Professor Evaluate Project Failure', () => {
    it('Should Failure Evaluate the project', (done) => {
        request(app)
            .put('/project/evaluate')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.EVALUATE.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Realocation of Project with Success', () => {
    it('Should Realocation the project success', (done) => {
        request(app)
            .put('/project/reallocate')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.REALLOCATE.SUCCESS.T1)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Realocation of Project with Failures', () => {
    it('Should Failure Realocation the project', (done) => {
        request(app)
            .put('/project/reallocate')
            .set('Accept', 'application/json')
            .send(CONSTANTS.PROJECT.REALLOCATE.FAILURE.T1)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Get Project by ID', () => {
    it('Should get specific project', (done) => {
        request(app)
            .get('/project/1')
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

describe('Delete a Project Success', () => {
    it('Should delete a project', (done) => {
        request(app)
            .delete('/project/1')
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

describe('Get User Proposals', () => {
    it('Should get user proposals', (done) => {
        request(app)
            .get('/userProposals/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                done();
            }).catch((error) => {
                done(new Error(error));
            });
    });
});

describe('Delete a Project Failure', () => {
    it('Should not delete a project', (done) => {
        request(app)
            .delete('/project/a')
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

describe('Initial Page', () => {
    it('Should get initial project page', (done) => {
        request(app)
            .get('/')
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