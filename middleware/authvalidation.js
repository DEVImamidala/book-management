exports.validatePassword=function(password) {
    // Define a regular expression for password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    return passwordPattern.test(password);
  }
  exports.validateemail=function(email){
   if(email){
    const emailpattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailpattern.test(email);
  
    }
  
//   exports.validatephnnumber= function(phnnumber){
   
//     if(phnnumber.length==10){
//         return phnnumber;
//     }
//   }
  

  exports.validatename = function (username) {
    const patternName = /^[a-zA-Z]+$/; 
    return patternName.test(username);
  }
}
 