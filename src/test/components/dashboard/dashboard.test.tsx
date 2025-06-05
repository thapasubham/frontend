import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import getUser from "../../../api/user/getUser";
import Dashboard from "../../../Components/dashboard/dashboard.tsx";
import { userTypes } from "../../../types/user.ts";
import { useAuth } from "../../../auth/AuthContext.tsx";

const mockedUsedNavigate = jest.fn();
jest.mock("../../../auth/AuthContext", () => ({
    useAuth: jest.fn(),

}));
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedUsedNavigate,
}))
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
        (getUser as jest.Mock).mockResolvedValue([]);
        render(<Dashboard />);
        await waitFor(() => {
            const result = screen.getByTestId("error")

            expect(result).toBeInTheDocument();
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
        (getUser as jest.Mock).mockResolvedValue(users);


        render(<Dashboard />);


        const prevButton = await screen.findByTestId("previous-button") as HTMLButtonElement;
        fireEvent.click(prevButton);
        await waitFor(() => {
            expect(getUser).toBeCalledTimes(1);
        })
    })


})