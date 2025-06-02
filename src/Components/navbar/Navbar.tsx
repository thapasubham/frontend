import About from '../about/About';
import Home from '../home/home';
import './navbar.css';

function NavBar() {
    return (
        <>
            <nav className="navbar">

                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
            <Home />
            <About />
        </>
    );
}

export default NavBar;
