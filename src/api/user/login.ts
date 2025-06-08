import { config } from "../apiURL.ts";
import axios from "axios";

const { apiUrl } = config;
async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log(apiUrl);
  // perfrom network request
  const url = `${apiUrl}/user/login`;
  console.log(url);
  const result = await axios.post(
    url,
    { email, password },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return { status: result.status, message: result.data.response };
}

export default loginUser;
