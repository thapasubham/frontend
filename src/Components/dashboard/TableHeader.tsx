import {useState} from "react";

function TableHeader({setFilter, setOrderBy}:{setFilter: (filter: string) => void, setOrderBy: (orderBy: string)=>void} ) {
    const [order, setOrder] = useState(false);
    function handleClick(column: string){
        setFilter(column)

      setOrder(!order);
        console.log(order);

        if (order){
            setOrderBy("ASC")
        } else {
            setOrderBy("DESC")
        }

    }



    return (
        <>
            <thead>
                <tr>
                    <td onClick={() => handleClick("firstname")}>
                        Firstname
                    </td>
                    <td onClick={() => handleClick("lastname")}>
                        Lastname
                    </td>
                    <td onClick={() => handleClick("email")}>
                        Email
                    </td>
                    <td onClick={() => handleClick("password")}>
                        Phone
                    </td>
                <td>
                   Action
                </td>
                    </tr>
            </thead>
        </>
    )
}

export default TableHeader;