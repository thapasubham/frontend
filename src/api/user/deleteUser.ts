import {FAILED_TO_DELETE_USER, USER_DELETED} from "../../constants/constant";

export async function deleteUser(id: number) {
  try {
    //call the api here

    if (id === -1) {
      return { status: 404, message: FAILED_TO_DELETE_USER };
    }

    return { status: 200, message: USER_DELETED };
  } catch (e) {
    return { status: 500, message: (e as Error).message };
  }
}
