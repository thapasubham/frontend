import signUp from "../../../api/user/signUp.ts";
import { userPayload } from "../../../types/user.ts";
import axios from "axios";
import {USER_CREATED} from "../../../constants/constant.ts";


describe("Signup api tests", () => {
  const user: userPayload = {
    id: 0,
    firstname: "Subham",
    lastname: "Thapa",
    email: "subham@gail.com",
    password: "password123",
    phoneNumber: "subham123",
  };
  it("User Created test", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      status: 201,
      data:   {message:USER_CREATED},
    });

    const result = await signUp(user, "users");
    console.log(result);
    expect(result.status).toBe(201);
  });
});
