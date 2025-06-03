import {useAuth} from "../../auth/AuthContext.tsx";

function Logout() {
const { setIsLogged} = useAuth();
    const handleLogout = (): void => {
    setIsLogged(false);    }
    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}
export default Logout;