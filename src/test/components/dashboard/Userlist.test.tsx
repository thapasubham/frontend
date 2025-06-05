import { render, screen } from "@testing-library/react";
import Userlist from "../../../Components/dashboard/Userlist.tsx";
import { userTypes } from "../../../types/user.ts";


describe("User component", () => {
    const mockUser: userTypes = {
        id: 5,
        firstname: "Subham",
        lastname: "Thapa",
        email: "subham@thapa",
        phoneNumber: "9175848545"
    };

    it("renders the user's info in table cells", () => {
        render(<table><tbody><Userlist user={mockUser} /></tbody></table>);

        expect(screen.getByText(mockUser.firstname)).toBeInTheDocument();
        expect(screen.getByText(mockUser.lastname)).toBeInTheDocument();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(screen.getByText(mockUser.phoneNumber)).toBeInTheDocument();
    });
});
