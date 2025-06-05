import { userTypes } from "../../types/user";

function User({ user }: { user: userTypes }) {
    return (
        <>

                <tr>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                </tr>

        </>
    )
}

export default User;