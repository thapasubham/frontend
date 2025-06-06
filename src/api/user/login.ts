import {config} from "../apiURL.ts";
import axios, {isAxiosError} from "axios";


async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
      const {apiUrl}= config;
    // perfrom network request
    const url = `${apiUrl}/user/login`;

    const result = await axios.post(url, {email, password}, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

        },
    )

    return result;
  }
  catch (error) {

      if (isAxiosError(error) && error.response) {

          const { status, data } = error.response|| {status: 500, data:"Failed to call api"};
          throw { status, message: data.message || "Login failed" };
      }
  }
}

export default loginUser;
