import {useState} from "react";

function CreateUser(){
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
    });

    return(
        <>
        <div className="user-form">
            <input />

            <label>Role</label>

        </div>
        </>
    )
}

function RoleList({role}:{role:string}) {}
export default CreateUser;