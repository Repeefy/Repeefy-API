"use strict";

const bookshelf = require("../bookshelf");

let Wallet = bookshelf.Model.extend({
    tableName: "wallet",
    hasTimestamps: true,

    WalletAccount() {
        return this.hasOne("WalletAccount");
    }
});

module.exports = bookshelf.model("Wallet", Wallet);