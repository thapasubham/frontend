import React, {useEffect, useRef, useState} from "react";
import { editUser } from "../../api/user/editUser.ts";
import {useNavigate, useParams } from "react-router-dom";
import { getUserByid } from "../../api/user/getUserByid.ts";
import {Refresh} from "../../api/refresh/refresh.ts";
import {useAuth} from "../../auth/AuthContext.tsx";
import {userErrorType} from "../../validation/userFormError.types.ts";
import validateCreate from "../../validation/validateCreate.ts";
import {hasNoSelection} from "@testing-library/user-event/dist/cjs/utils.js";

function EditUser() {
    const { id, userType } = useParams();
  const {isLoggedIn, userStatus} = useAuth()
    const [retry,setRetry]= useState(0)
    const [form, setform] = useState(
        {
            id: Number(id),
            firstname: "",
            lastname: "",
            phoneNumber: "",
            email: "",
        });
  const maxRetry = 1;
    const [error, setError] = useState("");
    const [formError, setFormError] = useState<userErrorType>({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
    });
    const navigate = useNavigate();

    const refresh =async (response) =>{
        setRetry(rerty+1);
        if(response.status === 401 && retry<maxRetry ) {

            const result = await  Refresh(userStatus);
            if (result) {
                setRetry(0);
                console.log(result);
                setError("");
                return true;
            } else  {
                navigate("/login");
            }
        }
        else
        {
            console.log(response)
            const {message} = response;

            setError(message);
        }
return false;
    }
    const fetchUser = async () => {
        console.log("Fetching user", userType);
        try {
            const response = await getUserByid(form.id, userType as string);



            if (response.status === 200) {
                const userDate = response.data;
                setform(prev => ({ ...prev, ...userDate }));

                setError("");

            }

            await refresh(response);

        } catch (e) {
            console.error(e);
            setError(()=>(e as Error).message);
        }

    };

    useEffect(() => {
        fetchUser();

    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            setRetry(0);
                 setError("");

        const errors = validateCreate(form);
        setFormError({...formError, ...errors});
        const hasErrors = Object.values(errors).some((msg) => msg !== "");
        if(hasErrors) {

            return;
        }

        //calling the function that does api call
        const result = await editUser(form, userType as string);
        console.log(result)
        if(result.status === 200) {
            alert(result.message);
            navigate("/dashboard");
        } else  if(result.status===409){
            setFormError({...formError, ...result.message});
         }

         await refresh(result);

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setform({ ...form, [name]: value });
    }
    return (
        <>
            {error && (<p className="errorMessage">{error}</p>)}
            <div className="user-form">
                <h3>Edit Details</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="edit-firstname">Firstname</label>
                    <input
                        data-testid="edit-firstname"
                        type="text"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                    />

                    {formError.firstname&& (<p className="formError">{formError.firstname}</p>)}
                    <label htmlFor="edit-lastname">Lastname</label>
                    <input
                        data-testid="edit-lastname"
                        type="text"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                    />
                    {formError.lastname&& (<p className="formError">{formError.lastname}</p>)}
                    <label htmlFor="edit-email">Email</label>
                    <input
                        data-testid="edit-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    {formError.email&& (<p className="formError">{formError.email}</p>)}

                    <label htmlFor="edit-phoneNumber">Phone no</label>
                    <input
                        data-testid="edit-phoneNumber"
                        type="text"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    {formError.phoneNumber&& (<p className="formError">{formError.phoneNumber}</p>)}

                    <button data-testid="submitButton">Submit</button>
                </form>
            </div>
        </>
    )

}

export default EditUser;