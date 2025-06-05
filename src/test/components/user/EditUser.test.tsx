import {getUserByid} from "../../../api/user/getUserByid.ts";
import {EditUser} from "../../../Components/user";
import { render, waitFor} from "@testing-library/react";
import {useParams} from "react-router-dom";


jest.mock('../../../api/user/editUser');
jest.mock("react-router-dom", () => ({
    useParams: jest.fn(),
}));
jest.mock('../../../api/user/getUserByid');
window.alert = jest.fn();
describe("Edit User", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (useParams as jest.Mock).mockReturnValue({ id: user.id });
    });

    const user = {
    id: 5,
    firstname: "John",
    lastname: "BloodBorne",
    email: "john@b.com",
    phoneNumber: "9748515354"
}
    it("User doesnt exists", async () =>{
        (getUserByid as jest.Mock).mockReturnValue({status:404, message: "User not found"});
        window.alert = jest.fn();

        render(<EditUser/>)
        await waitFor(() => {
        expect(getUserByid).toHaveBeenCalledTimes(1);
        expect(alert).toHaveBeenCalledWith("Error 404 User not found");
    })
    })

    it("User exists and renders correctly",async () =>{
        (getUserByid as jest.Mock).mockReturnValue({status: 200, data: user});
        const {getByTestId} = render(<EditUser/>)

        await waitFor(()=>{
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
})