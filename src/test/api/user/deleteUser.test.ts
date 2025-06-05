import { deleteUser } from "../../../api/user/deleteUser";
import { FAILED_TO_DELETE_USER } from "../../../constants/constant";

describe("Delete user api test", () => {
  test("Failed to delete User", async () => {
    const id = -1;

    const result = await deleteUser(id);

    expect(result.status).toEqual(404);
    expect(result.message).toEqual(FAILED_TO_DELETE_USER);
  });
  test("Delete User", async () => {
    const id = 5;

    const result = await deleteUser(id);

    expect(result.status).toEqual(200);
    expect(result.message).toEqual("User Deleted");
  });
});
