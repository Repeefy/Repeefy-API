"use strict";

const transactionCategory = ["credit", "debit", "wallet_credit"];
const notFoundError = "not found";
const duration = ["one_month", "six_months", "one_year", "recurring"];
const status_ = ["active", "inactive", "calcelled"];
const auth_error_message = "Authentication Error";
const status = {
    ENABLED: 1,
    DISABLED: 2
};
const verified = "Verification successful";
const transactionStatuses = ["initialized", "pending", "failed", "successful"];
const transactionLimit = 100;
const InvalidAmountError = "Please put in a valid amount";
const noWalletError = `Sorry, there's no wallet associated with this account`;
const noTokenError = "Please supply token to fund wallet";
const duplicateAccount = "Account number already exists";
const paymentApproved = "Approved";
const paystackBadRequestMessage = "Request failed with status code 400";
const noWalletForBeneficiaryError = "User does not have a wallet yet. Ask them to update account details and try again";

module.exports = {
    status_,
    transactionCategory,
    paymentApproved,
    notFoundError,
    duration,
    auth_error_message,
    status,
    transactionStatuses,
    transactionLimit,
    InvalidAmountError,
    duplicateAccount,
    noWalletError,
    noTokenError,
    paystackBadRequestMessage,
    noWalletForBeneficiaryError,
    verified
};