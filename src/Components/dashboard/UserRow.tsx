import {UserFetch} from "../../types/user.ts";
import {useAuth} from "../../auth/AuthContext.tsx";
import {UserType} from "../../types/userType.ts";
import {editUser} from "../../api/user/editUser.ts";
import { FAILED_TO_VERIFY, VERIFIED_SUCCESS} from "../../constants/constant.ts";
import {Refresh} from "../../api/refresh/refresh.ts";




function User({ userData, userType }: { userData: UserFetch , userType:string}) {
    const {permission} = useAuth();
    const {userStatus} = useAuth();

    const CTA = () => {
      return(
                <div className="actions">
                    <a href={`editUser/${userData.id}/${userType}`}>
                        <button className="edit-button">Edit</button>
                    </a>
                    {permission.includes("admin:delete") && (
                        <a href={`/delete/${userData.id}/${userType}`}><button className="delete-button">
                        Delete
                    </button>
                        </a>)}

                </div>
            );
        }
        const refresh = async ()=>{

        const result = await Refresh(userStatus);

        if(result){
           await verifyUser();
            return result;
        }
        return false
    }
        const verifyUser = async()=>{
             const payload = userData    ;
             payload.isverified = true;
             const response = await editUser(payload,userType );
             if(response.status === 200){
                 alert(VERIFIED_SUCCESS);
                 console.log(response.message);

             }

             const result = await refresh();

             if ( !result ){
                 alert(FAILED_TO_VERIFY);
             }
            return;
        }

        const Verify=()=>{
        return(
            <>
                <div className="actions">

                        <button onClick={verifyUser} className= "verify-button">Verify</button>

                    <a href={`deleteUser/${userData.id}/${userType}`}>
                        <button className="delete-button">Delete</button>
                    </a>
                </div>
            </>
        )
    }
console.log(userData.isverified, userData.firstname)
    return (
        <tr>
            <td><a href={`/profile/${userData.id}/${userType}`}>{userData.firstname}</a></td>
            <td>{userData.lastname}</td>
            <td>{userData.email}</td>
            <td>{userData.phoneNumber}</td>
            {userStatus !== UserType.USER && (
                <td>
                    {!userData.isverified ? Verify() : CTA()}
                </td>
            )}


        </tr>
    );
}

export default User;