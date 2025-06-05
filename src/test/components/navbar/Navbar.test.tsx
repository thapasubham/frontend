import { render, screen } from "@testing-library/react";
import NavBar from "../../../Components/navbar/Navbar.tsx";
import { useAuth } from "../../../auth/AuthContext.tsx";




jest.mock("../../../auth/AuthContext.tsx", () => (
    {
        useAuth: jest.fn()
    }
));
jest.mock("../../../Components/user/Logout.tsx", () => () => (<p>LogOut</p>))
describe("NavBar component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it("Displays navigation links when user not logged in", () => {
        (useAuth as jest.Mock).mockReturnValue({ isLogged: false });
        render(<NavBar />);

        expect(screen.getByTestId("link_home").textContent).toEqual("Home")
        expect(screen.getByTestId("link_about").textContent).toEqual("About")
        expect(screen.getByTestId("link_login").textContent).toEqual("Login");
    });
    it("Displays navigation links when logged in", () => {
        (useAuth as jest.Mock).mockReturnValue({ isLogged: true });
        render(<NavBar />);

        expect(screen.getByTestId("link_dashboard").textContent).toEqual("Dashboard")
        expect(screen.getByText("LogOut")).toBeInTheDocument();
    });
});
