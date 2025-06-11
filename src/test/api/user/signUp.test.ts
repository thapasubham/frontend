import signUp from "../../../api/user/signUp.ts";
import { userTypes } from "../../../types/user.ts";
import axios from "axios";


describe("Signup api tests", () => {
  const user: userTypes = {
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
      message: "User Created not Successfully",
    });

    const result = await signUp(user, "users");
    expect(result.status).toBe(201);
  });
});
