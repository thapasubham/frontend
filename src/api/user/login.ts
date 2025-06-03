import {userData} from "../../types/userData.ts";
import {delay} from "../delay.ts";


async function loginUser({email, password}: {email: string, password: string}) {

try{

    //perfrom network request
    console.log("Logged in");
    await delay(1000);
    const result = userData.some((u)=>u.email === email&&u.password === password);
    return result;
} catch (e) {
    return e.message;
}
}

export default  loginUser;