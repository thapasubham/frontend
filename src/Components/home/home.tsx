import { useState } from "react";
import { users } from "../../types/userdata";
import User from "../user/user";
import TableHeader from "../user/tableHeader";




function Home() {
    const [error, setError] = useState("");

    const user = users.map((u) => <User user={u} key={u.id} />)
    if (users.length === 0) { setError("hi") }
    return (
        <div>
            <table>
                <TableHeader />
                {error ? error : user}
            </table>
        </div>
    );
}

export default Home;
