import UserList from "./userList.tsx";
import {useState} from "react";
import './dashboard.css'
function DashBoard(){
    const [user, setuser] = useState("users")

    const mentor = ()=>{
        setuser("mentors")
    }
const users = ()=>{
        setuser("users")
}
return(
    <>
        <div>
    <div className="dashboard">
        <button onClick={users}>User List</button>

        <button onClick={mentor}>Admin List</button>



    </div>
        <UserList user={user}/>
    </div> </>
)
}
export default DashBoard;