import axios, {AxiosError, AxiosResponse} from "axios";
import { userPayload } from "../../types/user.ts";
import { config } from "../apiHelpers.ts";

const { apiUrl } = config;
async function signUp(user: userPayload, users: string) {
const payload: userPayload = {
  id: 0,
  firstname: user.firstname,
  lastname :user.lastname,
  email: user.email,
  phoneNumber :user.phoneNumber,
  role: user.role,
  password: user.password,
  isverified: user.isverified,
}


  try {
    //perform api request here
    const url = `${apiUrl}/${users||"users"}`;

    const result =  await  axios.post(url, payload);
    const {data} = result;
    return { status: result.status, message: data.message };

  } catch (err) {
    const {status, response, message} = err as AxiosError;



    return { status: status , message: response ? (response as AxiosResponse).data : message };
  }
}

export default signUp;
