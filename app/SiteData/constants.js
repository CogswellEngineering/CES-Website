export const BACK_END_URL = "https://cesadmin.herokuapp.com/";
export const LOGIN_PATH = "/users/login";
export const REGISTER_PATH = "/users/register";
export const ACCOUNT_RECOVERY_PATH = "/users/account-recovery";
export const RESET_PASSWORD_PATH = "/account/reset";
//Will decide whether uid or name later, it's easy change.
export const USER_PROFILE_PATH = "/account/:uid";
//Only owner can get to inventory and update profile
export const USER_INVENTORY_PATH = "/account/inventory";
export const UPDATE_USER_PROFILE_PATH = "/account/update";
export const BLOG_PATH = "/news";
export const SPECIFIC_POST = "/news/:uid"
export const EVENTS_PATH = "/events";
export const SPECIFIC_EVENT = "/events/:uid";

export const ADMIN_PATH = "/admin";

