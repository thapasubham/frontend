import { userTypes } from "../../types/user.ts";
import { config } from "../apiURL.ts";
import axios from "axios";

const {apiUrl} = config;
export async function editUser(user: userTypes) {
  try {
    //perform api request here
   const url = `${apiUrl}/user/${user.id}`;

   const result =  await  axios.put(url, user);
    //just return the response
  console.log(result);
    return { status: result.status, message: result.data.message };
  } catch (err) {
    return { status: 500, message: err.response.data.message };

  }
}
