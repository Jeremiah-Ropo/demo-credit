import * as chai from "chai";

const { expect } = chai;
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
        const newUser = await createUser(user, next);
        expect(newUser).to.be.an("object");
        expect(newUser).to.have.property("firstName");
        expect(newUser).to.have.property("lastName");
        expect(newUser).to.have.property("email");
        expect(newUser).to.have.property("password");
      } catch {
        expect.fail("createUser should not throw an error");
      }
    });
  });
});
