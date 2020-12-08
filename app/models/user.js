"use strict";

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
    }
});


module.exports = bookshelf.model("User", User);