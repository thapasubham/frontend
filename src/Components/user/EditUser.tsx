import React, {useEffect, useRef, useState} from "react";
import { editUser } from "../../api/user/editUser.ts";
import {useNavigate, useParams } from "react-router-dom";
import { getUserByid } from "../../api/user/getUserByid.ts";
import {Refresh} from "../../api/refresh/refresh.ts";
import {useAuth} from "../../auth/AuthContext.tsx";

function EditUser() {
    const { id, userType } = useParams();
  const {isLoggedIn, userStatus} = useAuth()
    const retry = useRef<boolean>(false);
    const [form, setform] = useState(
        {
            id: Number(id),
            firstname: "",
            lastname: "",
            phoneNumber: "",
            email: "",
        });
    const [error, setError] = useState("");
    const [formError, setFormError] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
    });
    const navigate = useNavigate();
    
    const fetchUser = async () => {
        console.log("Fetching user", userType);
        try {
            const response = await getUserByid(form.id, userType as string);


            if (response.status === 200) {
                const userDate = response.data;
                setform(prev => ({ ...prev, ...userDate }));

                setError("");

            }
            if(response.status ===401) {
                 const result = await  Refresh(userStatus);
                 if (result) {
                     retry.current = true;
                 } else {
                     navigate("/login");
                 }
            }
            else
            {
                console.log(response);
                const message = response.message as string;

               setError(message);
            }
        } catch (e) {
            console.error(e);
            setError(()=>(e as Error).message);
        }

    };

    useEffect(() => {
        fetchUser();

    }, [retry]);

    const validate =() =>{
        const error: typeof formError = {
            firstname: "",
            lastname: "",
            email: "",
            phoneNumber: ""
        }
        if(!form.firstname.trim()){
            error.firstname = "First name is required";
        }else{
            error.firstname = "";
        }

        if(!form.lastname.trim()){
            error.lastname="Last name is required";
        } else{
            error.lastname = "";
        }
        if(!form.email.trim()){
            error.email = "Email is required";
        } else {
            error.email = "";
        }
        if(!form.phoneNumber.trim()){
            error.phoneNumber= "Phone number is required";
        }else if(isNaN(Number(form.phoneNumber.trim()))){
            error.phoneNumber = "Phone number is invalid";
        }else if(form.phoneNumber.length!==10){
            error.phoneNumber = "Phone number should be 10 digits";
        } else  {
            error.phoneNumber = "";
        }
        return error;
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validate();
        setFormError({...formError, ...errors});
        const hasErrors = Object.values(formError).some((msg) => msg !== "");
        console.log(hasErrors);
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
            else   {
                setError(result.message.message);
        }
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