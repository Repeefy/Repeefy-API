'use strict';
let httpStatus = require("http-status");
let logger = require('turbo-logger').createStream({});
const UserService = require('../service/user');
const errors = require('../error.js');

class UserController {

    async create(req, res) {
        return await new UserService().create(req.body)
            .then((resData) => {
                return res.status(201).send(
                    httpStatus.CREATED, 
                    {
                        message: "user created",
                        data: resData
                    },
                );
            })
            .catch((error) => {
                logger.log(error);
                res.status(500).send(
                    httpStatus.INTERNAL_SERVER_ERROR,
                    new errors.InternalServerError(error.message.toString())
                );            
            });
    }

    /**
     * Endpoint to login a User
     */
    async login(req, res) {
        return await new UserService().login(req.body)
            .then((resData) => {
                return res.status(200).send(
                    httpStatus.OK, 
                    {
                        message: "user logged in successfully",
                        token: resData.token
                    },
                );
            })
            .catch((error) => {
                logger.log(error);
                res.status(500).send(
                    httpStatus.INTERNAL_SERVER_ERROR,
                    new errors.InternalServerError(error.message.toString())
                );                   
            });
    }

}

module.exports = UserController;