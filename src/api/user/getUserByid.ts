import { delay } from "../delay";
import {userData} from "../../types/userData.ts";

export async function getUserByid(id: number) {
    try{
       //make api call here
        await delay(250)

        const result = userData.find((u)=>u.id === id);
        if (result===undefined) {
            return {status: 404, message: "User not found"};

        }
        else {
            return {status: 200, data: result};
        }

    } catch (e){
        return {status:404, message:"User not found"};
    }
}