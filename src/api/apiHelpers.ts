export const config= {
    apiUrl: import.meta.env.VITE_BASE_URL,
};


export function getCookie(name:string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
  console.log(parts);
    if (parts.length === 2) {
        return parts[1].split(';').shift()
    }
    return null;
}

