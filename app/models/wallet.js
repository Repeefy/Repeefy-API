"use strict";

const bookshelf = require("../bookshelf");

let Wallet = bookshelf.Model.extend({
    tableName: "wallet",
    hasTimestamps: true,
});

module.exports = bookshelf.model("Wallet", Wallet);