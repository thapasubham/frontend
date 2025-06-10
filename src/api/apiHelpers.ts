export const config= {
    apiUrl: import.meta.env.VITE_BASE_URL,
};


function getCookie(name:string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts[1].split(';').shift()
    }
    return null;
}

export const bearerToken = getCookie("bearerToken") as string;
