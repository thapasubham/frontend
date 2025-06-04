import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../Components/about/About";
import Dashboard from "../Components/dashboard/dashboard.tsx";
import Home from "../Components/home";
import {SignUp, Login, Logout, EditUser} from "../Components/user/index"
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
                <Route path='/editUser/:id' Component={EditUser} />
            </Routes>
        </BrowserRouter>
    )
}