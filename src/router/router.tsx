import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../Components/about/About";
import Dashboard from "../Components/dashboard/dashboard.tsx";
import Home from "../Components/home";
import Login from "../Components/user/Login";
import Logout from "../Components/user/Logout.tsx";
export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={Home} />
                <Route path='/about' Component={About} />
                <Route path='/login' Component={Login} />
                <Route path='/dashboard' Component={Dashboard} />
                <Route path='/logout' Component={Logout} />
                <Route path='/userlist' Component={Dashboard} />
            </Routes>
        </BrowserRouter>
    )
}