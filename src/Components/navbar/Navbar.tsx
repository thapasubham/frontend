import './navbar.css';
import Logout from "../user/Logout.tsx";
import { useAuth } from "../../auth/AuthContext.tsx";



function NavBar() {

    const { isLogged } = useAuth();
    console.log(isLogged);
    return (
        <>
            <nav className="navbar">

                <ul className="nav-links">
                    <li data-testid='link_home'><a href="/">Home</a></li>
                    <li data-testid='link_about'><a href="/about">About</a></li>

                    {isLogged ?
                        (
                            <>
                                <li data-testid='link_dashboard'><a href="/dashboard">Dashboard</a></li>
                                <Logout/>

                            </>
                        )
                        :
                        (<>
                            <li data-testid='link_login'><a href="/login">Login</a></li>
                            <li data-testid='link_signup'><a href="/signup">Sign up</a></li>
                        </>
                        )
                    }
                </ul>
            </nav >
        </>
    );
}

export default NavBar;
