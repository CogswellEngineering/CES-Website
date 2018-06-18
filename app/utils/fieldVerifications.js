export function verifyEmail(email){

     //Validating email
     const emailRegex = /@cogswell.edu$/

     console.log("email",email);
     var valid = emailRegex.test(email); 
     if (valid){
         const prefix = email.split("@")[0];

         valid = prefix.length >= 1 && (prefix !== "@cogswell.edu");


     }
     return valid;
}

export function verifyPassword(password){

 //Validating password
     //const pwRegex = /?=[a-z]?=[A-Z])?=[0-9]/
     const pwRegex = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/
    ];

    //Cause if not meet length req, I don't care bout characteres in it.
    var valid = true;
    console.log("Password",password);

    for (var i = 0; i < pwRegex.length && valid; ++i){
        valid = pwRegex[i].test(password);
        console.log("Still valid",valid);
    }

    if (valid){
        valid = password.length >= 6;
    }
     
     return valid;

}