"use strict";

let knex = require("./db");
let bookshelf = require("bookshelf")(knex);

// Hide attributes when calling toJSON
bookshelf.plugin(require("bookshelf-eloquent"));

module.exports = bookshelf;