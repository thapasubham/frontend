import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import { deleteUser } from "../../../api/user/deleteUser"
import {FAILED_TO_DELETE_USER, USER_DELETED} from "../../../constants/constant"
import { DeleteUser } from "../../../Components/user"
import {useParams} from "react-router-dom"

jest.mock("react-router-dom", ()=>({
    useParams: jest.fn ()
}));
jest.mock("../../../api/apiURL", () => ({
    config: {
        apiUrl: "http://localhost:mock",
    },
}));
jest.mock("../../../api/user/deleteUser");
window.alert = jest.fn();
describe("Delete component test", () => {

    beforeEach(() => {
        jest.clearAllMocks();

        (useParams as jest.Mock).mockReturnValue({id: 5})
    })

    it("Failed to delete user", async () => {
        (deleteUser as jest.Mock).mockResolvedValue({ status: 400, message: FAILED_TO_DELETE_USER })
        window.alert = jest.fn();

        render(<DeleteUser />)
        const deleteButton = await screen.findByText("Confirm") as HTMLElement;
        fireEvent.click(deleteButton)
        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith(FAILED_TO_DELETE_USER)
        })
    })
    it("Delete user", async () => {
        (deleteUser as jest.Mock).mockResolvedValue({ status: 400, message: USER_DELETED })
        window.alert = jest.fn();

        render(<DeleteUser />)
        const deleteButton = await screen.findByText("Confirm") as HTMLElement;
        fireEvent.click(deleteButton)
        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith(USER_DELETED)
        })
    })

})