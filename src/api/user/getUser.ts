import { userData } from "../../types/userdata.ts";
import { delay } from "../delay.ts";

async function getUser(limit:number, offset:number) {
  //make api call here

  await delay(300);
  console.log(limit, offset);
  console.log(userData);
  const slicedUser = userData.slice(offset, offset + limit);
  console.log(slicedUser);
  return slicedUser;
}

export default getUser;
