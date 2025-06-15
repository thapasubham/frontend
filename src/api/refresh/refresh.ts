import axios from "axios";
import {config} from "../apiHelpers.ts";
import {setTokens} from "./setTokens.ts";

const {apiUrl} = config;
export async function Refresh(userType: string) {

    try{
        const refresh = localStorage.getItem("refreshToken");


        const url =`${apiUrl}/${userType}/refreshToken`;
        const result = await axios.post(url,{}, {
        headers: {
          Authorization: `refreshToken ${refresh}`,
        }
        }
        );


        setTokens(result.data, userType);
         return true;
    }
    catch(err) {
    return false;
    }
}