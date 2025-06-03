import React, { useState } from "react";
import "./form.css"
import loginUser from "../../api/user/login.ts";
import { useAuth } from "../../auth/AuthContext.tsx";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const { setIsLogged } = useAuth();

    function userInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUser((user) => ({ ...user, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await loginUser(user)

        if (result === true) {
            setIsLogged(true);
            localStorage.setItem("isLogged", "true");

        } else {
            alert("User doesnt exists");
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