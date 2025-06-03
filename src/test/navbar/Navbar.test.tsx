import { render, screen } from "@testing-library/react";
import NavBar from "../../Components/navbar/Navbar.tsx";

jest.mock("../../Components/dashboard/dashboard.tsx", () => () => <div>Home Component</div>);
jest.mock("../../Components/about/About.tsx", () => () => <div>About Component</div>);

describe("NavBar component", () => {
    it("Displays navigation links", () => {
        render(<NavBar />);

        expect(screen.getByTestId("link_home").textContent).toEqual("Home")
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

});
