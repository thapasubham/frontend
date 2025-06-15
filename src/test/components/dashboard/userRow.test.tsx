import { render, screen } from "@testing-library/react";
import Userlist from "../../../Components/dashboard/UserRow.tsx";
import {UserFetch} from "../../../types/user.ts";
import AuthProvider from "../../../auth/AuthContext.tsx";


describe("User component", () => {
    const mockUser: UserFetch = {
        id: 5,
        firstname: "Subham",
        lastname: "Thapa",
        email: "subham@thapa",
        phoneNumber: "9175848545",
        isverified: false,
        role: 0
    };

    it("renders the user's info in table cells", () => {
        render(<AuthProvider><table><tbody><Userlist userData={mockUser} userType={""} /></tbody></table></AuthProvider>);

        expect(screen.getByText(mockUser.firstname)).toBeInTheDocument();
        expect(screen.getByText(mockUser.lastname)).toBeInTheDocument();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(screen.getByText(mockUser.phoneNumber)).toBeInTheDocument();
    });
});
