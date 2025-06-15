import {config} from "../apiHelpers.ts";
import {SOMETHING_WENT_WRONG} from "../../constants/constant.ts";

const {apiUrl} = config;
export async function userRole(id: number, users: string){
    const url = `${apiUrl}/graphql`;

    const query = `
    query user($id: ID!){ 
    roles{
    id 
    name
    }
    
       user: get${users}(id: $id){
       id
            firstname
            lastname
            role{
            id
            }
            email
            phoneNumber
        }    
    }`

    const variables = {
        id: id,
    }
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query, variables}),
    });

    const json = await result.json();

    if (result.status !== 200) {
        throw new Error(SOMETHING_WENT_WRONG);
    }

    return {status: 200, data: json.data};
}