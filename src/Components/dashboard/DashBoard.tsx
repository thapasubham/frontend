import UserList from "./userList.tsx";
import {useState} from "react";
import './dashboard.css'

import {useAuth} from "../../auth/AuthContext.tsx";
import {UserType} from "../../types/userType.ts";



function DashBoard() {
    const [user, setUser] = useState("users");
    const {  permission } = useAuth();

    const showAdminOptions = permission.includes("admin:view");
    const canCreate = permission.includes("admin:add");

    return (
        <div>
            <div className="dashboard">
                <button onClick={() => setUser("users")}>User List</button>

                {showAdminOptions && (
                    <>
                        <button onClick={() => setUser(UserType.ADMIN)}>Admin List</button>
                        <button onClick={() => setUser(UserType.USER)}>Unverified User</button>
                        {canCreate && <a className="links" href="/create">Create User</a>}
                    </>
                )}
            </div>

            <UserList user={user} />
        </div>
    );
}

export default DashBoard;
