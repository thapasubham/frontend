import { useAuth } from "../../auth/AuthContext.tsx";
import { delay } from "../../api/delay.ts";

function Logout() {
    const { setIsLogged } = useAuth();

    const handleLogout = async () => {

        await delay(500);
        setIsLogged(false);
        localStorage.clear();
    }
    return (
        <>

            <button onClick={handleLogout}>Logout</button>
        </>
    )
}
export default Logout;