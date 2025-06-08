import {userTypes} from "../../../types/user.ts";
import {editUser} from "../../../api/user/editUser.ts";
import {USER_DOES_NOT_FOUND} from "../../../constants/constant.ts";


describe("Signup api tests", () => {
    const user: userTypes ={
        id: 0,
        firstname: "Subham",
        lastname: "Thapa",
        email: "subham@gmail.com",
        password: "password123",
        phoneNumber: "subham123"

    }
    it('User Edit test throws error',  async () => {

        const result =  await editUser(user);
        expect(result.status).toBe(500)
        expect(result.message).toBe(USER_DOES_NOT_FOUND);
    });
    it('User Updated',  async () => {
        user.id=10
        const result =  await editUser(user);
        expect(result.status).toBe(200)
        expect(result.message).toBe("User Updated")
    });
})