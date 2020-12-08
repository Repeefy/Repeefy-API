"use strict";

const bookshelf = require("../bookshelf");

let Beneficiary = bookshelf.Model.extend({
    tableName: "beneficiaries",
    hasTimestamps: true,
});


module.exports = bookshelf.model("Beneficiary", Beneficiary);
