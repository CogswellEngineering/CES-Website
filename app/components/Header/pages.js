export const navPages = [
    {
      name: "Home",
      url: "/",
    },
   {
      name: "Events",
      url:"/Events"
    },
    {
      name:"Blog",
      url:"/Blog"
    },
]

export const servicePages = [
    //Either drop down for services or just flat link to it.
    {
      name:"Libray",
      url:"https://ces.library.com"
    },
   {
      name:"3DPrinting",
      url:"https://ces.3Dprinting.com"
    }
    
];

export const LOGIN_PATH = "/users/login";
export const REGISTER_PATH = "/users/register";
export const ACCOUNT_RECOVERY_PATH = "/users/account-recovery";
export const RESET_PASSWORD_PATH = "/account/reset";
//Will decide whether uid or name later, it's easy change.
export const USER_PROFILE_PATH = "/account/:uid";

