"use strict";

const constants = require("../config/constants");

exports.up = function(knex) {
    return knex.schema
        .createTableIfNotExists("user_type", function(table) {
            table.increments("id").primary();
            table.string("name").notNullable();
        })
        .createTableIfNotExists("status", function(table) {
            table.increments("id").primary();
            table.string("value").notNullable();
          })
        .createTableIfNotExists("users", function(table) {
            table.increments("id").primary();
            table.string("name").nullable();
            table.string("email").notNullable();
            table.string("password").notNullable();
            table.string("username").notNullable();
            table.string("phone_number").notNullable();
            table.string("reference").notNullable();
            table.string("state").nullable();
            table.integer("user_type_id").unsigned().notNullable().references("id").inTable("user_type");
            table.string("image_url").nullable();
            table.string("image_public_id").nullable();
            table.integer("status_id").unsigned().notNullable().references("id").inTable("status");
            table.timestamps();
        })
        .createTableIfNotExists("wallet_account", function(table) {
            table.increments("id").primary();
            table.integer("user_id").unsigned().notNullable().references("id").inTable("users");
            table.string("account_number").notNullable();
            table.string("account_name").notNullable();
            table.string("bank_name").notNullable();
            table.string("bank_code").nullable();
            table.string("account_code").nullable();
            table.timestamps();
        })
        .createTableIfNotExists("wallet", function(table) {
            table.increments("id").primary();
            table.integer("wallet_account_id").unsigned().notNullable().references("id").inTable("wallet_account");
            table.integer("user_id").unsigned().notNullable().references("id").inTable("users");
            table.string("previous_balance").notNullable();
            table.string("current_balance").notNullable();
            table.timestamps();
        })
        .createTableIfNotExists("beneficiaries", function(table) {
            table.increments("id").primary();
            table.integer("user_id").unsigned().notNullable().references("id").inTable("users");
            table.integer("user_type_id").unsigned().notNullable().references("id").inTable("user_type");
            table.integer("benefactor_user_id").unsigned().notNullable().references("id").inTable("users");
            table.integer("pay_date").unsigned().notNullable();
            table.integer("amount").unsigned().notNullable();
            table.enu("duration", constants.duration);
            table.string("title").notNullable();
            table.timestamps();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("user_type")
        .dropTableIfExists("users")
        .dropTableIfExists("wallet_account")
        .dropTableIfExists("transaction_logs")
        .dropTableIfExists("beneficiaries");
};
