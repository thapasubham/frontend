import './navbar.css';
import { useAuth } from "../../auth/AuthContext.tsx";



function NavBar() {

    const { isLogged, userID, userStatus} = useAuth();
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
                                <li><a href={`/profile/${userID}/${userStatus}`}>Profile</a></li>
                                <li data-testid='link_profile' className="logout"> <a href="/Logout">Logout</a></li>

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
