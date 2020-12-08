"use strict";

const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");
const authKey = config.auth_key;
const BCRYPT_SALT_ROUNDS = 12;
const bcrypt = require("bcrypt");
const logger = require("turbo-logger").createStream({});
const httpStatus = require("http-status");


class Authenticate {

    /*
    * Handles Authentication with
    * jwt
    */
    getToken(payload) {
        return new Promise((resolve) => {
            jwt.sign({payload}, authKey,
                {
                    expiresIn: "6h"
                },
                (err, token) => {
                    if(err) {
                        logger.error(err);
                        return false;
                    }
                    return resolve(token);
                }
            );
        });
    }

    /*
    * Generates Hash for passwords with
    * Bcrypt
    */
   async hashPassword (password) {
        const hash = await new Promise((resolve) => {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
                return resolve(hashedPassword);
            })
            .catch((error) => {
                logger.error("Could not hash password", error);
            });
        });
        return hash;
   }

   /*
    * Compare Hash for passwords with
    * Bcrypt
    */
   async comparePassword(password, hash) {
       const compare = await new Promise((resolve) => {
           bcrypt.compare(password, hash)
                .then((result) => {
                    return resolve(result);
                })
                .catch((error) => {
                    logger.log(error);
                    return error;
                });
       });
       return compare;
   }

   /**
    * Verify Token to Protect route
    */
   async VerifyToken(req, res, next) {
        const access_token = req.query.access_token;
        if (access_token) {
            await jwt.verify(access_token, authKey, (err, decoded) => {       
                if (err) {
                    return res.json({ success: false, message: "Failed to authenticate token." });
                } else {
                    next();
                }
            });
        } else {
            return res.send(
                httpStatus.UNAUTHORIZED, 
                {
                    status: "Unauthenticated",
                    message: "Authentication Error. Please log in"                 
                },
            );
        }
   }



   /**
    * Get Token details
    * @param {String} token 
    */
   async getTokenDetails(token) {
        return await jwt.verify(token, authKey, (err, decoded) => {   
            if (err) {
                return false;
            } else {
                return decoded;
            }
        });     
    }
}

module.exports = Authenticate;