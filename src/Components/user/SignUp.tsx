import React, { useState } from "react";
import signUp from "../../api/user/signUp.ts";

export function SignUp() {
    const [form, setForm] = useState({
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (form.confirmPassword !== form.password) {
            alert("Passwords do not match");
            return;
        }

        try {
            const result = await signUp(form);


            if (result.status === 201) {
                alert(result.message); // Should be a string
                // Optionally redirect or reset form here
            } else {
                alert(result.message); // Handle error messages from backend
            }

        } catch (err) {
            console.error("Registration error:", err);
            alert((err as Error).message);
        }
    }


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((user) => ({ ...user, [name]: value }));
    }

    return (
        <div className="user-form">
            <h3>Sign Up</h3>
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

                <label htmlFor="lastname">Lastname</label>
                <input
                    data-testid="lastname"
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    data-testid="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="phoneNumber">Phone no</label>
                <input
                    data-testid="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                />

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

                <div className="show-password">
                    <input
                        data-testid="showPassword"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                </div>

                <button data-testid="submitButton" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;
