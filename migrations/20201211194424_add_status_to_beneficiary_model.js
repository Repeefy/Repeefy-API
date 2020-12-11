const constants = require('../config/constants');

exports.up = function(knex, Promise) {
    return knex.schema.table('beneficiaries', function(t) {
        t.enu("status", constants.status_);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('beneficiaries', function(t) {
        t.dropColumn('status');
    });
};
