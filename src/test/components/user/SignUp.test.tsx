import { fireEvent, render, waitFor } from "@testing-library/react";
import signUp from "../../../api/user/signUp";
import SignUp from "../../../Components/user/SignUp.tsx";



jest.mock("../../../api/user/signUp");
describe("Sign up", () => {
    beforeEach(() => {
        (signUp as jest.Mock).mockReset()
    })

    it("Form is rendering correctly", () => {
        const { getByTestId } = render(<SignUp />)

        const firstname = getByTestId("firstname") as HTMLInputElement;
        const lastname = getByTestId("lastname") as HTMLInputElement;
        const email = getByTestId("email") as HTMLInputElement;
        const password = getByTestId("password") as HTMLInputElement;
        const phoneNumber = getByTestId("phoneNumber") as HTMLInputElement;
        const confirmPassword = getByTestId("confirmPassword") as HTMLInputElement;
        const showPassword = getByTestId("showPassword") as HTMLInputElement;

        expect(firstname.value).toEqual("");
        expect(lastname.value).toEqual("");
        expect(email.value).toEqual("");
        expect(password.value).toEqual("");
        expect(phoneNumber.value).toEqual("");
        expect(confirmPassword.value).toEqual("");
        expect(showPassword.value).toEqual("on");


    })
    it("Should be able to register user", async () => {
        const mockResponse = { status: 201, message: "User Created" };
        (signUp as jest.Mock).mockResolvedValue(mockResponse);

        window.alert = jest.fn();

        const { getByTestId } = render(<SignUp />);

        const firstname = getByTestId("firstname") as HTMLInputElement;
        const lastname = getByTestId("lastname") as HTMLInputElement;
        const email = getByTestId("email") as HTMLInputElement;
        const password = getByTestId("password") as HTMLInputElement;
        const phoneNumber = getByTestId("phoneNumber") as HTMLInputElement;
        const confirmPassword = getByTestId("confirmPassword") as HTMLInputElement;
        const submitButton = getByTestId("submitButton") as HTMLButtonElement;


        fireEvent.change(firstname, { target: { value: "Subham" } });
        fireEvent.change(lastname, { target: { value: "Thapa" } });
        fireEvent.change(email, { target: { value: "subham@thapa.com" } });
        fireEvent.change(phoneNumber, { target: { value: "9748214526" } });
        fireEvent.change(password, { target: { value: "password123" } });
        fireEvent.change(confirmPassword, { target: { value: "password123" } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(signUp).toHaveBeenCalledWith({
                id: 0,
                firstname: "Subham",
                lastname: "Thapa",
                email: "subham@thapa.com",
                phoneNumber: "9748214526",
                password: "password123",
                confirmPassword: "password123"
            });

            expect(window.alert).toHaveBeenCalledWith("User Created");
        });
    });

});
