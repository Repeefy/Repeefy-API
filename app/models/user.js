"use strict";

const utils = require('../../config/utils');
const bookshelf = require("../bookshelf");

require('./wallet');
require('./user_type');

let User = bookshelf.Model.extend({
    tableName: "users",
    hasTimestamps: true,

    Wallet() {
        return this.hasOne("Wallet");
    },

    UserType() {
        return this.hasOne("UserType");
    },

    fetchUserByParam: async function(param, col) {
        return new Promise((resolve, reject) => {
            return new User()
                .query((qb) => {
                    qb.where(col, "=", param);
                })
                .fetch()
                .then((res) => {
                    return resolve(utils.toJSON(res));
                })
                .catch((err) => {
                    if(err.message === "EmptyResponse") {
                        return resolve(null);
                    }
                    return reject(err);
                });
        });
    },
    fetchUserByEmail: async function(email) {
        return new Promise((resolve, reject) => {
            return new User()
                .query((qb) => {
                    qb.where("email", "=", email);
                })
                .fetchAll({withRelated: ["Wallet"]})
                .then(async (res) => {
                    return resolve(await utils.toJSON(res));
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    },
});


module.exports = bookshelf.model("User", User);