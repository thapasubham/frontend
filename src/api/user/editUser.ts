import {getCookie, config} from "../apiHelpers.ts";
import axios, {AxiosError} from "axios";


export interface updateUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: number;
}
const {apiUrl} = config;
export async function editUser(payload: updateUser, user:string) {
  try {
    //perform api request here
   const url = `${apiUrl}/${user}/${payload.id}`;
      console.log(url);
      const bearerToken = getCookie("bearerToken") as string;
   const result =  await  axios.put(url, payload, {
       headers: {
        Authorization: `Bearer ${bearerToken}`,
       }
   });
    //just return the response
    return { status: result.status, message: result.data.message };
  } catch (err) {
      const {status ,message, response} = err as AxiosError;
    return { status: status , message: response?response.data :message };

  }
}
