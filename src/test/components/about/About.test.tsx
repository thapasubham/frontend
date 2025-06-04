import About from "../../../Components/about/About.tsx";
import {render, screen} from "@testing-library/react";

describe("About Page", () => {
    it("renders About Page", () => {
        render(<About />)

        expect(screen.getByText("About this page")).toBeInTheDocument();
    })
})