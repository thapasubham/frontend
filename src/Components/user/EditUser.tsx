import React, { useEffect, useState } from "react";
import { editUser } from "../../api/user/editUser.ts";
import {useNavigate, useParams } from "react-router-dom";
import { getUserByid } from "../../api/user/getUserByid.ts";
import {SOMETHING_WENT_WRONG} from "../../constants/constant.ts";

function EditUser() {
    const { id } = useParams();
    const [user, setUser] = useState(
        {
            id: Number(id),
            firstname: "",
            lastname: "",
            phoneNumber: "",
            email: "",
        });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const fetchUser = async () => {
        try {
            const response = await getUserByid(user.id);

            console.log(response);
            if (response.status === 200) {
                const userDate = response.data;
                setUser(prev => ({ ...prev, ...userDate }));

                setError("");

            } else {
                console.log(response);
                const message = response.data.message as string;

                alert(`Error ${response.status} ${message}`);
            }
        } catch (e) {
            console.error(e);
            setError(()=>SOMETHING_WENT_WRONG);
        }

    };

    useEffect(() => {
        fetchUser();

    }, [id]);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await editUser(user);
        if(result.status === 200) {
            alert(result.message);
            navigate("/dashboard");
        } else  {
        alert(result.message)
            }

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    return (
        <>
            {error && (<p>{error}</p>)}
            <div className="user-form">
                <h3>Edit Details</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="edit-firstname">Firstname</label>
                    <input
                        data-testid="edit-firstname"
                        type="text"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="edit-lastname">Lastname</label>
                    <input
                        data-testid="edit-lastname"
                        type="text"
                        name="lastname"
                        value={user.lastname}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="edit-email">Email</label>
                    <input
                        data-testid="edit-email"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="edit-phoneNumber">Phone no</label>
                    <input
                        data-testid="edit-phoneNumber"
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        required
                    />


                    <button data-testid="submitButton" type="submit">Submit</button>
                </form>
            </div>
        </>
    )

}

export default EditUser;