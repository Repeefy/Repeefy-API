"use strict";

const bookshelf = require("../bookshelf");

let UserType = bookshelf.Model.extend({
    tableName: "user_type",
    hasTimestamps: true,

    User() {
        return this.belongsTo("User");
    },
});


module.exports = bookshelf.model("UserType", UserType);