import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../Components/about/About";
import Dashboard from "../Components/dashboard/dashboard.tsx";
import Home from "../Components/home";
import Login from "../Components/user/Login";
import Logout from "../Components/user/Logout.tsx";
import SignUp from "../Components/user/SignUp.tsx";
import PageNotFound from "../Components/PageNotFound.tsx";
export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index Component={Home} />
                <Route path='/about' Component={About} />
                <Route path='/login' Component={Login} />
                <Route path='/dashboard' Component={Dashboard} />
                <Route path='/logout' Component={Logout} />
                <Route path='/userlist' Component={Dashboard} />
                <Route path='/signup' Component={SignUp} />
                <Route path='*' Component={PageNotFound} />
            </Routes>
        </BrowserRouter>
    )
}