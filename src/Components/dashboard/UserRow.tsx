import { userTypes } from "../../types/user.ts";
import {useAuth} from "../../auth/AuthContext.tsx";
import {UserType} from "../../types/userType.ts";




function User({ user, userType }: { user: userTypes , userType:string}) {
    const {permission} = useAuth();
    const {userStatus} = useAuth();



    const CTA = () => {
      return(
                <div className="actions">
                    <a href={`editUser/${user.id}/${userType}`}>
                        <button className="edit-button">Edit</button>
                    </a>

                    {permission.includes("admin:delete") && (
                        <a href={`/delete/${user.id}/${userType}`}><button className="delete-button">
                        Delete
                    </button>
                        </a>)}

                </div>
            );
        }

    return (
        <tr>
            <td><a href={`/profile/${user.id}/${userType}`}>{user.firstname}</a></td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            {userStatus!==UserType.USER && (<td>{CTA()}</td>)}
        </tr>
    );
}

export default User;