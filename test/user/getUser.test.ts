import * as chai from "chai";

const { expect } = chai;
import { getUserById } from "../../src/services/user.services";

describe("GetUserById Function", () => {
  describe("GET a User", () => {
    it("should GET a new user", async () => {
      const user = 1;
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const data = await getUserById(user, next);
        expect(data).to.be.an("object");
      } catch {
        expect.fail("GET user should not throw an error");
      }
    });
  });
});