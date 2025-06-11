import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import { deleteUser } from "../../../api/user/deleteUser"
import {FAILED_TO_DELETE_USER, USER_DELETED} from "../../../constants/constant"
import { DeleteUser } from "../../../Components/user"
import {useParams} from "react-router-dom"
import AuthProvider from "../../../auth/AuthContext.tsx";


jest.mock("../../../api/apiHelpers.ts", () => ({
    config: {
        apiUrl: "http://localhost:mock",
    },
}));
jest.mock("../../../api/user/deleteUser");
window.alert = jest.fn();
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedUsedNavigate,
    useParams: jest.fn ()
}))
const renderComponent = ()=>render(<AuthProvider><DeleteUser/></AuthProvider>)
describe("Delete component test", () => {

    beforeEach(() => {
        jest.clearAllMocks();

        (useParams as jest.Mock).mockReturnValue({id: 5, userType: "user"})
    })

    it("Failed to delete user", async () => {
        (deleteUser as jest.Mock).mockResolvedValue({ status: 400, message: FAILED_TO_DELETE_USER })
        window.alert = jest.fn();

        renderComponent()
        const deleteButton = await screen.findByText("Confirm") as HTMLElement;
        fireEvent.click(deleteButton)
        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith(FAILED_TO_DELETE_USER)
        })
    })
    it("Delete user", async () => {
        (deleteUser as jest.Mock).mockResolvedValue({ status: 400, message: USER_DELETED })
        window.alert = jest.fn();

        renderComponent();
        const deleteButton = await screen.findByText("Confirm") as HTMLElement;
        fireEvent.click(deleteButton)
        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith(USER_DELETED)
        })
    })

})