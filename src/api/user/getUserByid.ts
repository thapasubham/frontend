import { USER_DOES_NOT_FOUND } from "../../constants/constant.ts";
import {config} from "../apiURL.ts";


const {apiUrl}= config;
export async function getUserByid(id: number) {
  try {
    //make api call here
    const url =  `${apiUrl}/user/${id}`;
    console.log(url);
    const result = await fetch(url, {
      method: "GET",
    });
    const data = await result.json();

    return {status: result.status, data};

  } catch (e) {
    return { status: 404, message: USER_DOES_NOT_FOUND };
  }
}
