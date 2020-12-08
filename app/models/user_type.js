"use strict";

const bookshelf = require("../bookshelf");
const utils = require('../../config/utils');

let UserType = bookshelf.Model.extend({
    tableName: "user_type",
    hasTimestamps: true,

    User() {
        return this.belongsTo("User");
    },

    fetchUserType: async function(user_type) {
        return new Promise((resolve, reject) => {
            return new UserType()
                .query((qb) => {
                    qb.where("name", "=", user_type);
                })
                .fetchAll()
                .then((res) => {
                    return resolve(utils.toJSON(res));
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }
});


module.exports = bookshelf.model("UserType", UserType);