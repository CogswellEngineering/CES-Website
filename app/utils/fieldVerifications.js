export function verifyEmail(email){

     //Validating email
     const emailRegex = /@cogswell.edu$/

     var valid = emailRegex.test(this.state.email); 
     if (valid){
         const prefix = this.state.email.split("@")[0];

         valid = prefix.length > 1 && (prefix !== "@cogswell.edu");

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
    for (var i = 0; i < pwRegex.length && valid; ++i){
        valid = pwRegex[i].test(pw);
    }

    if (valid){
        valid = pw.length >= 6;
    }
     
     return valid;

}