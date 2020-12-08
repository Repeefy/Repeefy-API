"use strict";

const bookshelf = require("../bookshelf");

let WalletAccount = bookshelf.Model.extend({
    tableName: "wallet_account",
    hasTimestamps: true,

    Wallet() {
        return this.belongsTo("Wallet");
    },
});

module.exports = bookshelf.model("WalletAccount", WalletAccount);
