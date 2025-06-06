
import {fireEvent, screen, render, waitFor} from "@testing-library/react";
import AuthProvider from "../../../auth/AuthContext.tsx";
import Login from "../../../Components/user/Login.tsx";
import {LOGGED_IN_SUCCESS, USER_DOES_NOT_FOUND} from "../../../constants/constant.ts";
import loginUser from "../../../api/user/login.ts";


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedUsedNavigate,
}))

jest.mock("../../../api/apiURL", () => ({
    config: {
        apiUrl: "http://localhost:mock",
    },
}));
jest.mock("../../../api/user/login.ts")
const renderComponent = ()=>  render(<AuthProvider><Login /></AuthProvider>);
describe("login Test", ()=>{
    let email:HTMLInputElement;
    let password:HTMLInputElement;

    const email_val ="subham@gmail.com";
    const password_val ="subham123";

    beforeEach(()=>{
        jest.resetAllMocks();
    })
    it("Empty input", ()=>{

       renderComponent();

        email = screen.getByTestId("email")  as HTMLInputElement;
        password = screen.getByTestId("password")  as HTMLInputElement;
       expect(email.value).toEqual('');
       expect(password.value).toEqual('');

    })

    it("Should change input", ()=>
    {
    renderComponent();

       email = screen.getByTestId("email")  as HTMLInputElement;
        password = screen.getByTestId("password")  as HTMLInputElement;

        fireEvent.change(email, { target: { value: email_val } });
        fireEvent.change(password, { target: { value: password_val } });

        expect(email.value).toEqual(email_val);
        expect(password.value).toEqual(password_val);
    })
    it("Should login", async ()=>{
        window.alert = jest.fn();

        (loginUser as jest.Mock).mockResolvedValue({status: 200, data: "token"})
        renderComponent();
        email = screen.getByTestId("email")  as HTMLInputElement;
        password = screen.getByTestId("password")  as HTMLInputElement;
        fireEvent.change(email, { target: { value:  email_val } });

        fireEvent.change(password, { target: { value: password_val } });
        const button = screen.getByRole('button');
        fireEvent.click(button);
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith(LOGGED_IN_SUCCESS);
        })
    })
    it("Should show alert on login failure", async () => {
        window.alert = jest.fn();
        (loginUser as jest.Mock).mockRejectedValue({status: 200, data: "token"})
        renderComponent();
        fireEvent.change(screen.getByTestId("email"), { target: { value: email_val } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: password_val } });

        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(window.alert).not.toHaveBeenCalledWith(USER_DOES_NOT_FOUND);
        });
    });


})