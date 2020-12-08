"use strict";

const utils = require('../../config/utils');
const bookshelf = require("../bookshelf");

let User = bookshelf.Model.extend({
    tableName: "users",
    hasTimestamps: true,

    WalletAccount() {
        return this.hasOne("WalletAccount");
    },

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
    }
});


module.exports = bookshelf.model("User", User);