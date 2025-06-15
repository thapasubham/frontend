import PageNotFound from "../Components/PageNotFound.tsx";
import {render, screen} from "@testing-library/react";

describe("Page NotFound Test", () => {
    it('should Render Properly', () => {
        render(<PageNotFound />);

        expect(screen.getByText("404")).toBeInTheDocument()
    });
})