import {config} from "../apiURL.ts";

const {apiUrl}= config;
async function getUser(limit:number, offset:number) {
  //make api call here
  const url = `${apiUrl}/user/?limit=${limit}&offset=${offset}`;
  console.log(url);
  const result = await fetch(url, {
    method: "GET",
  })

  console.log(limit, offset);


  return  {status: result.status ,data: await result.json()};
}

export default getUser;
