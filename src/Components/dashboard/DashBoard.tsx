import UserList from "./userList.tsx";
import {useState} from "react";
import './dashboard.css'
import {useAuth} from "../../auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";



function DashBoard() {
    const [user, setUser] = useState("users");
    const {  permission } = useAuth();
    const navigate = useNavigate()
    const showAdminOptions = permission.includes("admin:view");
    const canCreate = permission.includes("admin:add");
    const [verified, setVerified] = useState(true);
    return (
        <div>
            <div className="dashboard">
                <button onClick={() => {
                    setUser("users");
                    setVerified(true);
                }}>User List</button>

                {showAdminOptions && (
                    <>
                        <button onClick={() =>{
                            setUser("mentors");
                            setVerified(true);
                        } }>Admin List</button>
                        <button onClick={()=>{
                            setUser("users");
                            setVerified(false);
                        }}>Unverified User</button>
                        {canCreate && <button onClick={()=>navigate("/create")}>Create User</button>}
                    </>
                )}
            </div>

            <UserList user={user} verified={verified} />
        </div>
    );
}

export default DashBoard;
