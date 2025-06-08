import { userTypes } from "../../types/user.ts";

function User({ user }: { user: userTypes }) {

        const deleteUser =async ()=>{
            const result = await deleteUser();
            console.log(result);
        }
    return (
        <>

                <tr>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                        <div className="actions">
                        <a href={`editUser/${user.id}`}>
                            <button className="edit-button">Edit</button>
                        </a>
                            <button className="delete-button" onSubmit={deleteUser}>Delete</button>
                        </div>
                        </td>
                </tr>

        </>
    )
}

export default User;