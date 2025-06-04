import {screen, render, waitFor} from "@testing-library/react";
import Dashboard from "../../Components/dashboard/dashboard.tsx";
import getUser from "../../api/user/getUser.ts";


jest.mock("../../api/user/getUser");
describe("Dashboard Test",  () => {
    beforeEach(() => {
        (getUser as jest.Mock).mockReset();
    })
    it("Empty users", async () => {
        (getUser as jest.Mock).mockResolvedValue([]);
        render(<Dashboard />);
    const result = await waitFor(()=> screen.getByTestId("error"));
    expect(result).toBeInTheDocument();
    })

    it("Failed to fetch user", async () => {
        const err ="Failed to fetch user";
        (getUser as jest.Mock).mockRejectedValue(new Error(err))
        render(<Dashboard />);
        const result = await waitFor(()=> screen.getByTestId("error"));
        expect(result).toBeInTheDocument();
        expect(result.textContent).toEqual(err)
    })


})