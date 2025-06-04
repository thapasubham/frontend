import {userTypes} from "../../types/user.ts";
import { delay } from "../delay.ts";

export  async function editUser(user: userTypes) {
    try{
        //perform api request here
        if(user.id==0) {
        throw new Error("No user")
        }
        console.log(user);
        delay(500);
        //just return the response
        return {status: 200, message: "User Updated" };

    } catch (err ){
        if (err instanceof Error) {
            return { status: 500, message: err.message };
        }
        return { status: 500, message: "Unknown error" };
    }
}