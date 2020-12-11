'use strict';
const Auth = require('../../config/auth');
const UserModel = require('../models/user');
const userModel = new UserModel();
const BeneficiaryModel = require('../models/beneficiary');
const utils = require('../../config/utils');
let logger = require('turbo-logger').createStream({});

class WalletService extends Auth {

     /**
     * Create a beneficiary
     * @param {Object} payload 
     * @param {Object} token 
     */
    async create(payload, token) {
        return new Promise(async(resolve, reject) => {
            const {beneficiary_email} = payload;
            let currentUser = await this.getTokenDetails(token);

            if(!currentUser) {
                return reject({message: "Authentication Error"});
            }
            const currentUserId = currentUser.payload.id;
            const userData = await userModel.fetchUserByEmail(beneficiary_email);

            //check if user exists
            if(!userData.length) {
                let message = "beneficiary does not exist";
                return reject({message: message});
            }

            if(currentUser.payload.email == userData[0].email) {
                return reject({message: "you cant be a benefactor of yourself"});
            }

            let data = {
                benefactor_user_id: currentUserId,
                pay_date: payload.pay_date,
                user_type_id: userData[0].user_type_id,
                user_id: userData[0].id,
                duration: payload.duration,
                amount: payload.amount,
                status: 'active',
                title: payload.title
            };
            //Get previous plans for user
            const activeBeneficiary = await new BeneficiaryModel().fetchBeneficiaryById(currentUserId);

            //validate if plan already exists
            if(!activeBeneficiary.length || !(this.verifyBeneficiaryPlan(activeBeneficiary, data))) {
                return await new BeneficiaryModel().save(data, { method: "insert" })
                    .then(async(res) => {
                        logger.log(
                            "Beneficiary plan created successfully"
                        );
                        return resolve(await utils.toJSON(res));                
                    })
                    .catch((error) => {
                        let message = "error occured while fetching beneficiaries";
                        logger.error(message, error);

                        if(error.code == "WARN_DATA_TRUNCATED") {
                            message = "Invalid duration selected";
                        }

                        return reject({
                            status: false, 
                            message: message
                        });     
                    });
            }
            else {
                return reject({
                    message: `beneficiary plan with title already exists for ${beneficiary_email}, try updating.`
                });
            }     
        });
    }


    /**
     * Verify if plan already exists
     * @param {Object} data 
     * @param {Object} newData 
     */
    verifyBeneficiaryPlan(data, newData) {
        return data.some((each) => (each.amount == newData.amount) && (each.user_id == newData.user_id) 
            && (each.title == newData.title));
    }


    async get() {
        return new Promise(async(resolve, reject) => {
            return resolve(new BeneficiaryModel().fetchAll());   
        })
    }
}

module.exports = WalletService;