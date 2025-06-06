import { useEffect, useState } from "react";
import TableHeader from "./TableHeader.tsx";
import getUser from "../../api/user/getUser.ts";
import Userlist from "./Userlist.tsx";
import { userTypes } from "../../types/user.ts";
import "./dashboard.css"
import { useAuth } from "../../auth/AuthContext.tsx";
import { useNavigate } from "react-router-dom";



function Dashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("Loading...");
    const [users, setUsers] = useState<userTypes[]>([]);
    const { isLogged } = useAuth();
    const navigate = useNavigate();
    const limit =2;
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState("");


    useEffect(() => {
        if (!isLogged) {

            setError("You need to login");
            navigate("/login");
        }
        getUsers();
    }, [isLogged, offset]);
    const getUsers = async () => {
        setLoading("Loading...");
        try {
        const response = await getUser(limit, offset);


            if (response.status!==200) {
                setError("No User Found");
                setLoading("");
            } else {
                setUsers(()=>response.data);
                setLoading("");
                setError("");
            }
        } catch (err) {
            setError((err as Error).message);

        }

    }

    const handlePrevious = () => {
        setOffset((prevState) => {
            return prevState <= 0 ? 0 : prevState - limit
        });

    }

    const handleNext = () => {
        setOffset(prevState => prevState + limit);
    }
    return (
        <div>
            <div className="pagination">
                <input type="text" placeholder="firstname" value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                < button data-testid="previous-button" onClick={handlePrevious}>Previous</button>

                <button data-testid="next-button" onClick={handleNext} disabled={!!error} >Next</button>
            </div>
            {error ? (
                <p data-testid="error">{error}</p>
            ) : (
                <>
                {loading ? (<p>{loading}</p>): (
                    <table className="user-table">
                        <TableHeader />


                                <tbody>
                                    {(users.map((u) => (
                                        <Userlist user={u} key={u.id} />
                                    )))
                                    }
                                </tbody>

                    </table> )
                }
                </>

            )
            }

        </div >
    );
}

export default Dashboard;
