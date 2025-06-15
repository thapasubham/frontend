import React, { useState } from "react";
import "./form.css"
import loginUser from "../../api/user/login.ts";
import { useNavigate } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { LOGGED_IN_SUCCESS } from "../../constants/constant.ts";
import {setTokens} from "../../api/refresh/setTokens.ts";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState("users")
    const [error, setError] = useState("");
    function userInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUser((user) => ({ ...user, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await loginUser(user, userType);

            if (data.status === 200) {

               setTokens(data.message, userType);
                alert(LOGGED_IN_SUCCESS);

                setError("");

                navigate("/");
            }

            else {
                setError(data.message);
            }
        } catch (error) {

            if (isAxiosError(error) && error.response) {
                // @ts-expect-error
                const message = (error as AxiosError).response.data.message;
               setError(message);
            }
            setError((error as Error).message);
        }

    }
    return (
        <>
            <div className="user-form">
                <h3>Login</h3>
                {error &&
                    (
                        <p className="errorMessage">{error}</p>
                    )
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input data-testid="email" type="email" name="email" value={user.email} onChange={userInput} required />
                    <label htmlFor="password">Password</label>
                    <input data-testid="password" type={showPassword?"text": "password"} name="password" value={user.password} onChange={userInput} required />
                    <div className="show-password">
                        <input
                            data-testid="showPassword"
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword">Show Password</label>
                    </div>
                    <div className="userType">
                        <input
                            data-testid="showPassword"
                            type="checkbox"
                            checked={userType === "mentors"}
                            onChange={(e) => {
                                const isAdmin = e.target.checked;
                                setUserType(isAdmin ? "mentors" : "users");
                            }}
                        />
                        <label >Login as Admin</label>
                    </div>

                    <button>Submit</button>
                </form>
            </div>

        </>
    )
}

export default Login;