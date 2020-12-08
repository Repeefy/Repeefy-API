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
    auth_key: process.env.AUTH_KEY || "secretKeyRef",
    paystack_base_url: process.env.PAYSTACK_BASE_URL || "https://api.paystack.co/",
    app_url:"http://localhost:3000",  //process.env.APP_URL || "http://localhost:3000/",
    // paystack_secret_key: "sk_live_200a59ec739acbc54523fa8c78cd7e9e020cc057"
    paystack_secret_key: "sk_test_aac435e4e889ee4da4a44ddb99a09ff2d61d773f" //process.env.PAYSTACK_SECRET_KEY || "sk_test_c383c6f92d8b2b95f8e4fd07b44611774f9ae3b5"
};