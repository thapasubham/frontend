import { useState } from "react";
import "./login.css"
import loginUser from "../../api/user/login.ts";
import {useAuth} from "../../auth/AuthContext.tsx";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const {setIsLogged} = useAuth();

    function userInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUser((user) => ({ ...user, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       const result=  await loginUser(user)
        if (result===true) {
            setIsLogged(true);

        } else{
            alert("User doesnt exists");
        }
    }
    return (
        <>
            <div className="login-form">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input data-testid="email-input" type="email" name="email" value={user.email} onChange={userInput} required />
                    <label>Password</label>
                    <input data-testid="password-input" type="password" name="password" value={user.password} onChange={userInput} required />
                    <button>Submit</button>
                </form>
            </div>

        </>
    )
}

export default Login;