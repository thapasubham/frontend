import './navbar.css';
import Logout from "../user/Logout.tsx";
import { useAuth } from "../../auth/AuthContext.tsx";



function NavBar() {

    const { isLogged } = useAuth();

    return (
        <>
            <nav className="navbar">

                <ul className="nav-links">
                    <li data-testid='link_home'><a href="/">Home</a></li>
                    <li id='link_about'><a href="/about">About</a></li>

                    {isLogged ?
                        (
                            <>
                                <li id='link_dashboard'><a href="/dashboard">Dashboard</a></li>
                                <Logout />

                            </>
                        )
                        :
                        (<>
                            <li id='link_login'><a href="/login">Login</a></li>
                            <li id='link_signup'><a href="/signup">Sign up</a></li>
                        </>
                        )
                    }
                </ul>
            </nav >
        </>
    );
}

export default NavBar;
