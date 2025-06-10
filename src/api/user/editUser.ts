import { userTypes } from "../../types/user.ts";
import {bearerToken, config} from "../apiHelpers.ts";
import axios, {AxiosError} from "axios";

const {apiUrl} = config;
export async function editUser(payload: userTypes, user:string) {
  try {
    //perform api request here
   const url = `${apiUrl}/${user}/${payload.id}`;

   const result =  await  axios.put(url, payload, {
       headers: {
        Authorization: `Bearer ${bearerToken}`,
       }
   });
    //just return the response
  console.log(result);
    return { status: result.status, message: result.data.message };
  } catch (err) {
      const {status ,message, response} = err as AxiosError;
    return { status: status , message: response?response.data :message };

  }
}
