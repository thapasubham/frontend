import axios from "axios";
import {config} from "../apiHelpers.ts";

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
        const {refreshToken, bearerToken }= result.data;
         localStorage.setItem("isLogged", "true");
         localStorage.setItem("refreshToken", refreshToken);
         document.cookie = "bearerToken=" + bearerToken+"; path=/";

         return true;
    }
    catch(err) {
    return false;
    }
}