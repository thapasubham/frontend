import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteUser } from "../../api/user/deleteUser";

function DeleteUser() {
    const { id } = useParams();

    const [error, setError] = useState("");

    const handleDelete = async () => {
        try {
            const result = await deleteUser(Number(id));
            if (result.status === 200) {
                alert(result.message);
            } else {
                alert(`Failed to delete user: ${result.message}`);
            }
        } catch (e) {
            setError("Something went wrong during deletion");
            console.error(e);
        }
    };

    return (
        <div>
            <h3>Delete User</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>Are you sure you want to delete user ID: {id}?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
        </div>
    );
}

export default DeleteUser;
