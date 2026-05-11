export function validatePasswordMatch(password: string, confirmPassword: string){
    if(password != confirmPassword) return "Passwords don't match";
    return null;
}