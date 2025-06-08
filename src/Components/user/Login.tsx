import React, { useState } from "react";
import "./form.css"
import loginUser from "../../api/user/login.ts";
import { useAuth } from "../../auth/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { LOGGED_IN_SUCCESS } from "../../constants/constant.ts";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const { setIsLogged } = useAuth();

    function userInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUser((user) => ({ ...user, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await loginUser(user);

            if (data.status === 200) {
                setIsLogged(true);
                localStorage.setItem("isLogged", "true");
                alert(LOGGED_IN_SUCCESS);
                navigate("/");
            }
            else {
                alert(data.message);
            }
        } catch (error) {

            if (isAxiosError(error) && error.response) {
                const status = error.status;
                // @ts-ignore
                const message = (error as AxiosError).response.data.message;
                alert(`${status} ${message}`);
            }
        }

    }
    return (
        <>
            <div className="user-form">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input data-testid="email" type="email" name="email" value={user.email} onChange={userInput} required />
                    <label htmlFor="password">Password</label>
                    <input data-testid="password" type="password" name="password" value={user.password} onChange={userInput} required />
                    <button>Submit</button>
                </form>
            </div>

        </>
    )
}

export default Login;