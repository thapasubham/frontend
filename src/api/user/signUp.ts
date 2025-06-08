import axios from "axios";
import { userTypes } from "../../types/user.ts";
import { config } from "../apiURL.ts";

const { apiUrl } = config;
async function signUp(user: userTypes) {
const payload: userTypes = {
  id: 0,
  firstname: user.firstname,
  lastname :user.lastname,
  email: user.email,
  phoneNumber :user.phoneNumber,
  password: user.password,
}
console.log(payload);
  try {
    //perform api request here
    const url = `${apiUrl}/user`;

    const result =  await  axios.post(url, payload);
    //just return the response
    console.log(result);
    return { status: result.status, message: result.data.message };
  } catch (err) {
    return { status: 500, message: err.response.data.message };

  }
}

export default signUp;
