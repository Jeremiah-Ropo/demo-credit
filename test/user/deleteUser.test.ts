import * as chai from "chai";

const { expect } = chai;
import { deleteUser } from "../../src/services/user.services";

describe("Delete User Function", () => {
  describe("DELETE a User", () => {
    it("should DELETE a new user", async () => {
      const user= 1;
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const newUser = await deleteUser(user, next);
        expect(newUser).to.be.an("string");
      } catch {
        expect.fail("DELETE user should not throw an error");
      }
    });
  });
});
