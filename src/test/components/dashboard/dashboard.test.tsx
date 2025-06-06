import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import getUser from "../../../api/user/getUser";
import Dashboard from "../../../Components/dashboard/dashboard.tsx";
import { userTypes } from "../../../types/user.ts";
import { useAuth } from "../../../auth/AuthContext.tsx";
import {SOMETHING_WENT_WRONG} from "../../../constants/constant.ts";

const mockedUsedNavigate = jest.fn();
jest.mock("../../../auth/AuthContext", () => ({
    useAuth: jest.fn(),

}));
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedUsedNavigate,
}));
jest.mock("../../../api/apiURL", () => ({
    config: {
        apiUrl: "http://localhost:mock",
    },
}));

jest.mock("../../../api/user/getUser");
describe("Dashboard Test", () => {
    beforeEach(() => {
        (getUser as jest.Mock).mockReset();
    })
    it("User not auth", async () => {
        (useAuth as jest.Mock).mockResolvedValue({ isLogged: false });
        (getUser as jest.Mock).mockReturnValue([])

        render(<Dashboard />);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");

    });
    it("Empty users", async () => {
        (useAuth as jest.Mock).mockReturnValue({ isLogged: true });
        (getUser as jest.Mock).mockResolvedValue({status: 404, message: "No User Found"});
        render(<Dashboard />);
        await waitFor(() => {
            const result = screen.getByTestId("error")

            expect(result).toBeInTheDocument();
        });
    })

    it("Error When fetching the data", async () => {
        (useAuth as jest.Mock).mockReturnValue({ isLogged: true });
        (getUser as jest.Mock).mockRejectedValue(new Error(SOMETHING_WENT_WRONG));
        render(<Dashboard />);
        await waitFor(() => {
            const result = screen.getByTestId("error") as HTMLElement;

            expect(result).toBeInTheDocument();
            expect(result.textContent).toEqual(SOMETHING_WENT_WRONG)
        });
    })
    it("Renders users", async () => {
        (useAuth as jest.Mock).mockReturnValue({ isLogged: true });

        const users: userTypes[] = [
            {
                id: 5,
                firstname: "Subham",
                lastname: "Thapa",
                email: "subham@gmail.com",
                phoneNumber: "984982683",
                password: "subham123"
            },
        ];

        // Mock user-fetching function
        (getUser as jest.Mock).mockResolvedValue({status: 200, data: users});


        render(<Dashboard />);


        const prevButton = await screen.findByTestId("previous-button") as HTMLButtonElement;
        fireEvent.click(prevButton);
        await waitFor(() => {
            expect(getUser).toHaveBeenCalledTimes(1);
            expect(screen.getByText(users[0].firstname)).toBeInTheDocument();
        })
    })


})