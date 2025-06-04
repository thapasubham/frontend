import signUp from "../../../api/user/signUp.ts";
import {userTypes} from "../../../types/user.ts";

describe("Signup api tests", () => {

    const user: userTypes ={
        id: 0,
        firstname: "Subham",
        lastname: "Thapa",
        email: "subham@gmail.com",
        password: "password123",
        phoneNumber: "subham123"

    }
    it('User Created test',  async () => {

        const result =  await signUp(user);
        expect(result.status).toBe(201)
        expect(result.message).toBe("User Created")
    });
})