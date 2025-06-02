import { render, screen } from "@testing-library/react";
import NavBar from "./Navbar";

jest.mock("../home/home", () => () => <div>Home Component</div>);
jest.mock("../about/About", () => () => <div>About Component</div>);

describe("NavBar component", () => {
    it("Displays navigation links", () => {
        render(<NavBar />);

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("Displays Home and About components", () => {
        render(<NavBar />);
        expect(screen.getByText("Home Component")).toBeInTheDocument();
        expect(screen.getByText("About Component")).toBeInTheDocument();
    });
});
