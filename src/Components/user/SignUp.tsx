import React, { useState } from "react";
import signUp from "../../api/user/signUp.ts";
import {useNavigate} from "react-router-dom";
import {userErrorType} from "../../validation/userFormError.types.ts";
import {validateCreate, sanitizeInput} from "../../validation/validateCreate.ts";

export function SignUp() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState<userErrorType>({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
    });


    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const payload = sanitizeInput(form)
        const validationErrors = validateCreate(payload);
        setFormError({...formError, ...validationErrors});


        const hasErrors = Object.values(validationErrors).some((msg) => msg !== "");
        if (hasErrors) {

            return;
        }

        try {
            const result = await signUp(payload, "users");


            if (result.status === 201) {
                alert(result.message);
                navigate("/login");
            } else if(result.status === 409 ||result.status === 400){
                setFormError({...formError,...result.message});
            }

        } catch (err) {
            setError((err as Error).message);

        }
    }


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((user) => ({ ...user, [name]: value }));
    }

    return (
        <div className="user-form">
            <h3>Sign Up</h3>
            {error&& (<p className="errorMessage">{error}</p>)}
            <form onSubmit={register}>
                <label htmlFor="firstname">Firstname</label>
                <input
                    data-testid="firstname"
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                />
                {formError.firstname && (<span className="formError">{formError.firstname}</span>)}
                <label htmlFor="lastname">Lastname</label>
                <input
                    data-testid="lastname"
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                />

                {formError.lastname && (<span className="formError">{formError.lastname}</span>)}
                <label htmlFor="email">Email</label>
                <input
                    data-testid="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                {formError.email && (<span className="formError">{formError.email}</span>)}
                <label htmlFor="phoneNumber">Phone no</label>
                <input
                    data-testid="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                />
                {formError.phoneNumber&& (<span className="formError">{formError.phoneNumber}</span>)}
                <label htmlFor="password">Password</label>
                <input
                    data-testid="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    data-testid="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {formError.password&& (<span className="formError">{formError.password}</span>)}
                <div className="show-password">
                    <input
                        data-testid="showPassword"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                </div>

                <div>

                </div>
                <button data-testid="submitButton">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;
