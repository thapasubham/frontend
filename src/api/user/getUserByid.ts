import {config, getCookie} from "../apiHelpers.ts";


const {apiUrl}= config;
export async function getUserByid(id: number, userType: string) {
  try {
    //make api call here
    const url =  `${apiUrl}/${userType}/${id}`;
    const bearerToken = getCookie("bearerToken") as string;
    const result = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${bearerToken}`,

      },
     credentials: "include"
    });
    const data = await result.json();

    return {status: result.status, data: data};

  } catch (e) {
    return { status: 404, message: (e as Error).message };
  }
}


