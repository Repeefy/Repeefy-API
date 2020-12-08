"use strict";

const shortid = require("shortid");

function toJSON(data) {
    return JSON.parse(JSON.stringify(data));
}

function buildQueryString(data) {
    if(!data) {return;}
    const uriEncode  = encodeURIComponent;
    const query = Object.keys(data)
                .map((param) => uriEncode(param) + "=" + uriEncode(data[param]))
                .join("&");
    return query;
}

function createReferenceString(params) {
    const prefix = "REP-";
    var numbers = Math.floor(1000 + Math.random() * 9000);
    return prefix + shortid.generate() + numbers;
}

module.exports = {
    toJSON,
    buildQueryString,
    createReferenceString
};