'use strict';
let httpStatus = require("http-status");
let logger = require('turbo-logger').createStream({});

class UserController {

    async create() {
        return await new UserService().create(req.body)
            .then((resData) => {
                return res.send(
                    httpStatus.CREATED, 
                    {
                        message: "user created",
                        data: resData
                    },
                );
            })
            .catch((error) => {
                logger.log(error);
                res.send(
                    httpStatus.INTERNAL_SERVER_ERROR,
                    new errors.InternalServerError(error.message.toString())
                );            
            });
    }
}

module.exports = UserController;