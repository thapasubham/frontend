import { EditUser } from "../../../Components/user";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import { useParams } from "react-router-dom";
import {UNAUTHORIZED_ERROR, USER_DOES_NOT_FOUND} from "../../../constants/constant.ts";
import AuthProvider from "../../../auth/AuthContext.tsx";
import {mockedUsedNavigate} from "../../../../jest.setup.ts";
import {Refresh} from "../../../api/refresh/refresh.ts";
import {editUser} from "../../../api/user/editUser.ts";
import {userRole} from "../../../api/user/userRole.ts";


jest.mock('../../../api/user/editUser');


jest.mock('../../../api/user/userRole.ts');
jest.mock('../../../api/refresh/refresh');
jest.mock('../../../api/user/editUser', () => ({
    editUser: jest.fn(),
}));
const renderComponent = ()=>     render(<AuthProvider><EditUser /></AuthProvider>)
describe("Edit User", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (useParams as jest.Mock).mockReturnValue({ id: user.id, userType: "users" });
    });

    const roles =[{
        id:3,
        name: "admin"
    },
        {
            id:4,
            name: "user"
        }
    ]
    const user = {
        id: 5,
        firstname: "John",
        lastname: "BloodBorne",
        email: "john@b.com",
        phoneNumber: "9748515354"
    }
    it("User doesnt exists", async () => {
        (userRole as jest.Mock).mockReturnValue({ status: 404, message: USER_DOES_NOT_FOUND });
        window.alert = jest.fn();

        renderComponent();
        await waitFor(() => {
            expect(userRole).toHaveBeenCalledTimes(1);
            expect(screen.getByTestId("error")).toBeInTheDocument()
        })
    })



    it('Unauthorized sends to login', async () => {
        (userRole as jest.Mock).mockResolvedValue({ status: 401, message: UNAUTHORIZED_ERROR });
        (Refresh as jest.Mock).mockResolvedValue(false);
         renderComponent()

        await waitFor(()=> {


            expect(mockedUsedNavigate).toHaveBeenCalledWith("/login")
        });

    });

    it("Unauthorized cannot access", async () => {
        (userRole as jest.Mock).mockRejectedValue({ status: 403, message: UNAUTHORIZED_ERROR });

        renderComponent()

        await waitFor(()=> {


          expect(userRole ).toHaveBeenCalledTimes(1);
            expect(screen.getByTestId("error")).toBeInTheDocument()
        });

    })
    it("User exists and renders correctly", async () => {
        (userRole as jest.Mock).mockReturnValue({ status: 200, data: {user : user, roles: roles} });
        const { getByTestId } = renderComponent()

        await waitFor(() => {
            const firstname = getByTestId("edit-firstname") as HTMLInputElement;
            const lastname = getByTestId("edit-lastname") as HTMLInputElement;
            const email = getByTestId("edit-email") as HTMLInputElement;
            const phoneNumber = getByTestId("edit-phoneNumber") as HTMLInputElement;

            expect(firstname.value).toEqual(user.firstname);
            expect(lastname.value).toEqual(user.lastname);
            expect(email.value).toEqual(user.email);
            expect(phoneNumber.value).toEqual(user.phoneNumber);
        })
    })
    it("Handle Submit" ,async () => {

        (userRole as jest.Mock).mockReturnValue({ status: 200, data: {user: user, roles: roles} });
        user.email= "";
        const {getByTestId} = renderComponent();
            await waitFor(() => {

                const submitButton = getByTestId("submitButton") as HTMLButtonElement;
                fireEvent.click(submitButton);

                expect(editUser).toHaveBeenCalledTimes(0);



        })
    })
})