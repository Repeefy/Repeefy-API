'use strict';

let logger = require('turbo-logger').createStream({});
const UserModel = require('../models/user');
const userModel = new UserModel();
const constants = require('../../config/constants');
const UserTypeModel = require('../models/user_type');
const Auth = require('../../config/auth');
const utils  = require('../../config/utils');

class UserService extends Auth  {

    async create(payload) {
        return new Promise(async (resolve, reject) => {
            const { email, password } = payload;
            const hashedPassword = await this.hashPassword(password);
            payload.password = hashedPassword;
            payload.name = payload.firstName + " " + payload.lastName;
            delete payload.firstName; delete payload.lastName; 
            const reference = await utils.createReferenceString();
            payload.reference = reference.toLocaleUpperCase();
            const userData = await userModel.fetchUserByParam(email, "email");

            const userType = await new UserTypeModel().fetchUserType(payload.user_type);
            payload.user_type_id = userType[0].id;
            delete payload.user_type;
            payload.status_id = constants.status.ENABLED;

            if(!userData) {
                return await userModel.save(payload, { method: "insert" })
                    .then(async () => {
                        logger.log("User saved successfully");
                        const loginData = await this.login({
                            email: payload.email,
                            password: password
                        });
                        return resolve(loginData);
                    })
                    .catch((error) => {
                        logger.error("An error occured while saving data : ", error);
                        return reject(error);
                    });
            }
            logger.error("user already exists : ", email);
            return reject({status: false, message: "user already exists"});
        })
    }


    
    /**
     * Login Service
     * @param {Object} payload 
     */
    async login(payload) {
        return new Promise(async(resolve, reject) => {
            const {email, password} = payload;
            const userData = await userModel.fetchUserByParam(email, "email");
            console.log(userData, payload)
            if(!userData) {
                return reject({status: false, message: "user " + constants.notFoundError});
            }

            const hashPassword = userData["password"];
            const compare = await this.comparePassword(password, hashPassword);
            if(compare) {
                const userToken = await this.getToken(userData);
                if(!userToken) {
                    return reject({message: "Invalid email or password"});
                }

                logger.log(`User ${email} logged in successfully`);
                return resolve({
                    status: "success",
                    token: userToken
                });
            }
            return reject({message: "Invalid email or password"});
        });
    }

}

module.exports = UserService;