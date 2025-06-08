import { useAuth } from "../../auth/AuthContext.tsx";

function Logout() {
    const { setIsLogged } = useAuth();

    const handleLogout = async () => {

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