'use strict';

let logger = require('turbo-logger').createStream({});

class UserService {
    
    constructor(logger) {
        this.logger = logger
    }
    
}

module.exports = UserService;