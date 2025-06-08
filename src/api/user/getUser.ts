import { config } from "../apiURL.ts";

const { apiUrl } = config;
async function getUser(limit: number, offset: number, filter: string) {
  //make api call here
  console.log(apiUrl);
  const url = `${apiUrl}/user/?limit=${limit}&offset=${offset}&filter=${filter?filter: ""}`;
  console.log(url);
  const result = await fetch(url, {
    method: "GET",
  });

  console.log(limit, offset);

  return { status: result.status, data: await result.json() };
}

export default getUser;
