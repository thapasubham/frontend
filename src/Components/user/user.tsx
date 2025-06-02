import { userTypes } from "../../types/user";

function User({ user }: { user: userTypes }) {
    return (
        <>
            <tbody>
                <td>{user.firstname}</td>

                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
            </tbody>
        </>
    )
}

export default User;