import axios, {AxiosError, AxiosResponse} from "axios";
import { userTypes } from "../../types/user.ts";
import { config } from "../apiHelpers.ts";

const { apiUrl } = config;
async function signUp(user: userTypes, users: string) {
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
    const url = `${apiUrl}/${users||"users"}`;

    const result =  await  axios.post(url, payload);
    return { status: result.status, message: result };

  } catch (err) {
    const {status, response, message} = err as AxiosError;

    return { status: status , message: response ? (response as AxiosResponse).data : message };
  }
}

export default signUp;
