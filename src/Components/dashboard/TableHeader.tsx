function TableHeader({setFilter}:{setFilter: (filter: string) => void}) {
    function handleClick(column: string){
        setFilter(column)

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