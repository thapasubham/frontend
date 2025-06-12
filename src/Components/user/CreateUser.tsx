import React, { useState, useEffect } from "react";
import { UserType } from "../../types/userType.ts";
import { Role } from "../../types/Role.ts";
import { getRoles } from "../../api/role/getRole.ts"; // make sure you have this
import  "./form.css"
import {userErrorType} from "../../validation/userFormError.types.ts";
import validateCreate from "../../validation/validateCreate.ts";
import signUp from "../../api/user/signUp.ts";
import {Refresh} from "../../api/refresh/refresh.ts";
import {useAuth} from "../../auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

function CreateUser() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        role: 1,
    });
    const [formError, setFormErrors] = useState<userErrorType>({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
    });
    const {userStatus} = useAuth()
    const [retry, setRetry] = useState(0);
    const [roles, setRoles] = useState<Role[]>([]);
    const [user, setUser] = useState(UserType.USER);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const maxRetry =1;

    //fetch the roles
    const fetchRoles = async () => {
        const result = await getRoles();
        try {
            if (result.data.length === 0) {
                setError("No roles found");
            }
            console.log(result.data);
            if (result.data) {
                setRoles(()=>result.data );
            }

        }
        catch(e){
        setError(e.message);}
        }


    useEffect(() => {
        fetchRoles();
    }, []);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
            const { name, value } = e.target;

            setForm({ ...form, [name]:  name === "role" ? Number(value) : value  });
    }

    const refresh =async () =>{
        setRetry(retry+1);

            const result = await  Refresh(userStatus);
            if (result) {
                setRetry(0);
                setError("");
                return true;
            } else  {
                navigate("/login");
            }
        }


    const handleRegister=async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const errors = validateCreate(form);
        const hasError = Object.values(errors).some((msg: string)=>msg!="")
        if(hasError){
           setFormErrors(errors);
            return;
        }

        try {
            const result = await signUp(form, user);

            if(result.status===201){
                alert(result.message)
            }
            if(result.status===409){
                setFormErrors(result.message)
            }

            if(result.status===401&& retry<maxRetry){
                await refresh()
            }

        }catch(e){
            setError((e as Error).message);
        }
    }


    return (
    <div className="user-form"> <h2>Create {user}</h2>

        {error&& (<p className="errorMessage">{error}</p>)}
        <form onSubmit={handleRegister}>
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
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
                <option value="" disabled>Select role</option>
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>


            <div className="userType">
                <input
                    data-testid="showPassword"
                    type="checkbox"
                    checked={user === UserType.ADMIN}
                    onChange={(e) => {
                        const isAdmin = e.target.checked;
                        setUser(isAdmin ? UserType.ADMIN : UserType.USER);
                    }}
                />
                <label >Create as Admin</label>
            </div>

            <div>

            </div>
            <button data-testid="submitButton">Submit</button>
        </form>

    </div>
    )
}

export default CreateUser;
