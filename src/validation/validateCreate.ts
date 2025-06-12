import {userErrorType} from "./userFormError.types.ts";
import {userCreate} from "../types/user.ts";

export default function validateCreate(user: userCreate) {
const  error: userErrorType = {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",

}
    if(!user.firstname.trim()){
        error.firstname = "First name is required";
    }else{
        error.firstname = "";
    }

    if(!user.lastname.trim()){
        error.lastname="Last name is required";
    } else{
        error.lastname = "";
    }
    if(!user.email.trim()){
        error.email = "Email is required";
    } else {
        error.email = "";
    }
    if(!user.phoneNumber.trim()){
        error.phoneNumber = "Phone number is required";
    }else if(isNaN(Number(user.phoneNumber.trim()))){
        error.phoneNumber = "Phone number is invalid";
    }else if(user.phoneNumber.length!==10){
        error.phoneNumber = "Phone number should be 10 digits";
    } else  {
        error.phoneNumber = "";
    }
    if(user.password && user.confirmPassword) {
        if (user.password !== user.confirmPassword) {
            error.password = "Password doesn't match";
        } else if (user.password.length < 6 || user.password.length > 15) {
            error.password = "Password should be at least 6 to 15 characters long";
        } else {
            error.password = "";
        }

    }
    return error;




}