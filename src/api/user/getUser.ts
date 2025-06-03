
// assuming userTypes is your type
import {userData} from "../../types/userData.ts";
import {delay} from "../delay.ts";


async function getUser() {
     await delay(300);

   return userData;
}

export default getUser;
