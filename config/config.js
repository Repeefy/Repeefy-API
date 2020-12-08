"use strict";

module.exports = {
    AppName: process.env.AppName || "beneficiary_service",
    port: process.env.PORT || 8082,
    cryptoKey: process.env.CRYPTO_KEY || "secretKeyRef",
    mysql: {
        connection: {
            host: process.env.DATABASE_HOST || "bs_db",
            port: process.env.DATABASE_PORT || 3306,
            database: process.env.DATABASE_NAME ||  "BSDBS",
            user: process.env.DATABASE_USERNAME || "bsuser",
            password: process.env.DATABASE_PASSWORD || "bs_pass",
            debug: process.env.DATABASE_DEBUG ? ["ComQueryPacket"] : false
        },
        pool: {
            min: (process.env.DATABASE_POOL_MIN) ? parseInt(process.env.DATABASE_POOL_MIN, 10) : 2,
            max: (process.env.DATABASE_POOL_MAX) ? parseInt(process.env.DATABASE_POOL_MAX, 10) : 2
        }
    },
    auth_key: process.env.AUTH_KEY || "secretKeyRef"
};