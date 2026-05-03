export function validatePasswordMatch(password: string, confirmPassword: string){
    if(password != confirmPassword) return "Passwords doesn't match";
    return null;
}