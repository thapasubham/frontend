import { deleteUser } from "../../../api/user/deleteUser";
import {FAILED_TO_DELETE_USER} from "../../../constants/constant";


describe("Delete user api test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  test("Failed to delete User", async () => {
    (fetch as jest.Mock).mockRejectedValue({status: 500, message: FAILED_TO_DELETE_USER})
    const id = -1;

    const result = await deleteUser(id, "users");

    expect(result.status).toEqual(500);
    expect(result.message).toEqual(FAILED_TO_DELETE_USER);
  });
  test("Delete User", async () => {
    const id = 5;
    (fetch as jest.Mock).mockResolvedValue({status: 204, message: "User deleted successfully"})
    const result = await deleteUser(id, "users");
console.log(result);
    expect(result.status).toEqual(204);

  });
});
