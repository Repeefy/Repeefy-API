"use strict";

const bookshelf = require("../bookshelf");
const utils = require('../../config/utils');

let Beneficiary = bookshelf.Model.extend({
    tableName: "beneficiaries",
    hasTimestamps: true,

    fetchBeneficiaryById: async function(id) {
        return new Promise((resolve, reject) => {
            return new Beneficiary()
                .query((qb) => {
                    qb.where("benefactor_user_id", "=", id);
                })
                .fetchAll()
                .then((res) => {
                    return resolve(utils.toJSON(res));
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    },
});


module.exports = bookshelf.model("Beneficiary", Beneficiary);
