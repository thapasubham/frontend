import { config } from "../apiHelpers.ts";
import axios, {AxiosError, AxiosResponse} from "axios";

const { apiUrl } = config;
async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}, users: string) {



    try {
        // perfrom network request
        const url = `${apiUrl}/${users}/login`;
        console.log(url);
        const result = await axios.post(
            url,
            {email, password},
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return {status: result.status, message: result.data};
    }catch (e) {
        const {response, message} = e as AxiosError;
        return { status: 500, message: response ? (response as AxiosResponse).data.message: message }
    }
}

export default loginUser;
