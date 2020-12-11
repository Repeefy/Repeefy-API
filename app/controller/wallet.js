'use strict';

const WalletService = require('../service/wallet');
let httpStatus = require("http-status");
let logger = require('turbo-logger').createStream({});
const errors = require('../error.js');
const constants = require('../../config/constants');

class Wallet {
    async create(req, res) {
        console.log("here")
        return await new WalletService().create(req.body, req.query.access_token)
        .then((resData) => {
            return res.send(
                httpStatus.CREATED, 
                {
                    message: "beneficiary created successfully",
                    data: resData
                },
            );
        })
        .catch((error) => {
            logger.log(error);
            if(error.message == constants.auth_error_message){
                return res.send(
                    httpStatus.UNAUTHORIZED,
                    new errors.UnauthorizedError(error.message.toString())
                ); 
            }
            res.send(
                httpStatus.INTERNAL_SERVER_ERROR,
                new errors.InternalServerError(error.message.toString())
            );            
        });
    }
}

module.exports = Wallet;