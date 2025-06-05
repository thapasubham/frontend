import { userTypes } from "../../types/user.ts";
import { delay } from "../delay.ts";
import {USER_DOES_NOT_FOUND} from "../../constants/constant.ts";

export async function editUser(user: userTypes) {
  try {
    //perform api request here
    if (user.id == 0) {
      throw new Error(USER_DOES_NOT_FOUND);
    }
    console.log(user);
    delay(500);
    //just return the response
    return { status: 200, message: "User Updated" };
  } catch (err) {
    return { status: 500, message: (err as Error).message };
  }
}
