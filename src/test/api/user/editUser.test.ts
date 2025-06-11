import {userTypes} from "../../../types/user.ts";
import {editUser} from "../../../api/user/editUser.ts";
import {USER_DOES_NOT_FOUND} from "../../../constants/constant.ts";
import axios from "axios";


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
        (axios.put as jest.Mock).mockRejectedValue({status: 500, message:USER_DOES_NOT_FOUND});
        const result =  await editUser(user, "user");
        expect(result.status).toBe(500)
        expect(result.message).toBe(USER_DOES_NOT_FOUND);
    });
    it('User Updated',  async () => {
        (axios.put as jest.Mock).mockResolvedValue({status:200,data:{message: "User Updated"}});
        user.id=10
        const result =  await editUser(user, "user");
        console.log(result);
        expect(result.status).toBe(200)
        expect(result.message).toBe("User Updated")
    });
})