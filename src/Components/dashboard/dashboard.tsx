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
    const limit =5;
    const [offset, setOffset] = useState(0);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");



    useEffect(() => {
        if (!isLogged) {

            setError("You need to login");
            navigate("/login");
        }
        getUsers();
    }, [isLogged, offset, filter]);
    const getUsers = async () => {
        setLoading("Loading...");
        try {
            console.log(filter);
        const response = await getUser(limit, offset, filter);


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
                <div className="dashboard">
                <div className="list-filter">
                <input type="text" placeholder="firstname" value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="pagination">< button data-testid="previous-button" onClick={handlePrevious}>Previous</button>

                <button data-testid="next-button" onClick={handleNext} disabled={!!error} >Next</button>
            </div>
                </div>
            {error ? (
                <p data-testid="error">{error}</p>
            ) : (
                <>
                {loading ? (<p>{loading}</p>): (
                    <table className="user-table">
                        <TableHeader  setFilter={setFilter} />


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
