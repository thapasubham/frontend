import { delay } from "../delay.ts";

import {userTypes} from "../../types/user.ts";
import {userData} from "../../types/userdata.ts";

async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    //perfrom network request
    console.log("Logged in");
    await delay(1000);
    const result = userData.some(
      (u:userTypes) => u.email === email && u.password === password
    );
    return result;
  } catch (e) {
    return e
  }
}

export default loginUser;
