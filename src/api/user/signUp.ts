import { delay } from "../delay.ts";
import { userTypes } from "../../types/user.ts";

async function signUp(payload: userTypes) {
  try {
    //do the api request here

    await delay(1000);
    payload.email = payload.firstname;
    return { status: 201, message: "User Created" };
  } catch (err) {
    return { status: 500, message: "Something went wrong" };
  }
}

export default signUp;
