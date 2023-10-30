const BASE_URL = process.env.REACT_APP_API_URL;

export const API_URL = BASE_URL + 'api/users/';
export const API_GET_TOKEN_URL = BASE_URL + 'api/token/';
export const API_REFRESH_TOKEN_URL = BASE_URL + 'api/token/refresh/';
export const API_CREATE_USER_URL = BASE_URL + 'api/create_user/';
export const API_GET_USER_URL = BASE_URL + 'api/get_user/';
export const API_GET_USER_ACCOUNTS_URL = BASE_URL + 'api/get_user_accounts';
export const API_CREATE_ACCOUNT_URL = BASE_URL + 'api/create_account/';
export const API_TRANSFER_FUNDS_URL = BASE_URL + 'api/transfer_funds/';
export const API_MONEY_TREE_URL = BASE_URL + 'api/money_tree/';
export enum AuthPageActions {
    LOG_IN = 'LOG_IN',
    SIGN_UP = 'SIGN_UP'
}