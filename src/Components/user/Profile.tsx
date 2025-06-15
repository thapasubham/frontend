import {useEffect,  useState} from "react";
import {getUserByid} from "../../api/user/getUserByid.ts";
import {Refresh} from "../../api/refresh/refresh.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../auth/AuthContext.tsx";
import {UserType} from "../../types/userType.ts";
import "./profile.css";
export function Profile(){
    const { id, userType } = useParams();
    const {isLogged, userID, userStatus } = useAuth();
    const [user, setUser] = useState({
        id: Number(id),
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",

    })
    const [allowEdit, setAllowEdit ]= useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [retry,setRetry]= useState(false);
    const [role, setRole] = useState({
    name: ""
    });
    const fetchUser = async () => {
        try {
            const response = await getUserByid(user.id, userType as string);

            console.log(response);
            if (response.status === 200) {
                const userDate = response.data;
                setUser(prev => ({ ...prev, ...userDate }));

                setRole(prev => ({ ...prev, ...userDate.role}));

                if (userStatus === UserType.ADMIN|| userID=== user.id) {
                    setAllowEdit(true);
                }

                setError("");

            }
            if(response.status ===401 && !retry) {
                console.log("response", response);
                const result = await  Refresh(userStatus);
                if (result) {
                   setRetry(true);
                   console.log(result);
                   setError("");
                } else  {
                   navigate("/login");
                }
            } else
            {
                console.log(response);
                const message = response.message as string;

                setError(message);
            }
        } catch (e) {
            console.error(e);
            setError(()=>(e as Error).message);
        }
    }
    useEffect(() => {
        console.log(isLogged);

      fetchUser()
    },[retry])
    return (
        <div className="profile-container">
            {error&& (<p className="errorMessage">{error}</p>)}
            <h3>Profile</h3>

            <div className="profile-row">
        <span>
          Name: {user.firstname} {user.lastname}
        </span>
                {allowEdit && (
                    <Link to={`/editUser/${user.id}/${userType}`}>
                        <button>Edit</button>
                    </Link>
                )}
            </div>

            <div className="profile-row">
                <span>Email: {user.email}</span>
            </div>

            <div className="profile-row">
                <span><label>Phone:</label> {user.phoneNumber}</span>
            </div>

            <div className="profile-row">
                <span>Role: {role?.name || "Unknown"}</span>
            </div>
        </div>
    );
}