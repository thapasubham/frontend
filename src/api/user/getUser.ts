import { config } from "../apiURL.ts";

const { apiUrl } = config;
async function getUser(search: string, searchBy: string,limit: number, offset: number, orderby: string, filter: string) {
  //make api call here
  const url =`${apiUrl}/graphql`;
  const filterColumn = filter?filter:"firstname"

  console.log("filterColumn: ", filterColumn);
  const query = `
  query user($search: String, $searchBy: String, $filter: String, $limit: Int!, $offset: Int!, $orderBy: String) {
    users(search: $search, searchBy: $searchBy, filter: $filter, limit: $limit, offset: $offset, orderBy: $orderBy) {
      id
      firstname
      lastname
      email
      phoneNumber
    }
  }
`;

  const variables = {
    search,
    searchBy,
    filter,
    limit,
    offset,
    orderBy: orderby,
  };

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });


  console.log(limit, offset);
const {data }= await result.json();
console.log(data)
  return { status: result.status, data:data.users };
}

export default getUser;
