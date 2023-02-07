const axios = require('axios');
const assert = require('assert');
const request = require('supertest');
const app = require('../utils/testapp');
const CONSTANTS = require('../utils/constants');
const environment = require('../../src/config/environment.config');
const utils = require('../../src/utils/functions')

describe('Utils -> funtions -> checkInt', () => {
    it('Should return true with a integer', () => {
        assert(utils.checkInt(3));
    });

    it('Should return false with a float', () => {
        assert(!utils.checkInt(3.3));
    });

});