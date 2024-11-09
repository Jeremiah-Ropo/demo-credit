import { expect } from "chai";

import { UserInputDTO } from "../../src/interfaces";
import { createUser } from "../../src/services/user.services";

describe("Registration Function", () => {
  describe("create a User", () => {
    it("should create a new user", async () => {
      const user: UserInputDTO = {
        firstName: "Test",
        lastName: "User",
        email: "support@blinkcash.ng",
        password: "password",
        karmaIdentity: "0zspgifzbo.ga",
      };
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const data = await createUser(user, next);
        expect(data).to.be.an("object");
      } catch {
        expect.fail("Create User should not throw an error");
      }
    });
  });
});
