import UserList from "./userList.tsx";
import {useState} from "react";
import './dashboard.css'
import {useAuth} from "../../auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

const  tabs ={
    userTab:"user-tab",
    adminTab:"admin-tab",
    unverifiedTab:"unverified-tab",
}

function DashBoard() {
    const [user, setUser] = useState("users");
    const {  permission } = useAuth();
    const [activeTab, setActiveTab] = useState(tabs.userTab);
    const navigate = useNavigate()
    const showAdminOptions = permission.includes("admin:delete");
    const canCreate = permission.includes("admin:view");
    const [verified, setVerified] = useState(true);
    return (
        <div>
            <div className="dashboard">
                <button className={activeTab===tabs.userTab? 'active-button': ''} onClick={() => {
                    setUser("users");
                    setVerified(true);
                    setActiveTab(tabs.userTab);
                }}
                disabled={activeTab === tabs.userTab}
                >User List</button>

                {showAdminOptions && (
                    <>
                        <button className={activeTab===tabs.adminTab? 'active-button': ''} onClick={() =>{
                            setUser("mentors");
                            setVerified(true);
                            setActiveTab(tabs.adminTab);
                        } }
                        disabled={activeTab === tabs.adminTab}
                        >Admin List</button>
                        <button className={activeTab===tabs.unverifiedTab? 'active-button': ''} onClick={()=>{
                            setUser("users");
                            setVerified(false);
                            setActiveTab(tabs.unverifiedTab);
                        }}
                            disabled={activeTab === tabs.unverifiedTab}
                        >Unverified User</button>

                    </>
                )}
                {canCreate && <button onClick={()=>navigate("/create")}>Create User</button>}
            </div>

            <UserList user={user} verified={verified} />
        </div>
    );
}

export default DashBoard;
