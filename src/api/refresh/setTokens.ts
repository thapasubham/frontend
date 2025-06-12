interface token {
   signed_token: {
       refreshToken: string;
       bearerToken: string;
   },
    permissions: []
    id: number
}
export function setTokens(data: token, userType: string) {

    const { signed_token, permissions } = data;
    const { refreshToken, bearerToken } = signed_token;
    // Store data in localStorage
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("userStatus", userType);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("permission", JSON.stringify(permissions));
    localStorage.setItem("userID", data.id.toString());
    document.cookie = "bearerToken=" + bearerToken + "; path=/";

}
