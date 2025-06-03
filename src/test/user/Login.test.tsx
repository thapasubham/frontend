import Login from "../../Components/user/Login.tsx";
import {fireEvent,  render} from "@testing-library/react";
import AuthProvider from "../../auth/AuthContext.tsx";

describe("login Test", ()=>{
    it("Empty input", ()=>{

       const {getByTestId} = render(<AuthProvider><Login /></AuthProvider>);

       const email = getByTestId("email") as HTMLInputElement;
       const password = getByTestId("password") as HTMLInputElement;
       expect(email.value).toEqual('');
       expect(password.value).toEqual('');

    })

    it("Should change input", ()=>{
        const {getByTestId} = render(<AuthProvider><Login /></AuthProvider>);

        const email = getByTestId("email")  as HTMLInputElement;
        const password = getByTestId("password")  as HTMLInputElement;

        fireEvent.change(email, { target: { value: "subham@gmail.com" } });
        fireEvent.change(password, { target: { value: "subham123" } });

        expect(email.value).toEqual('subham@gmail.com');
        expect(password.value).toEqual('subham123');
    })

})