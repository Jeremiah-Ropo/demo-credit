import * as chai from "chai";

const { expect } = chai;
import { UserLoginDTO } from "../../src/interfaces";
import { loginUser } from "../../src/services/user.services";

describe("Login Function", () => {
  describe("Login a User", () => {
    it("should create a new user", async () => {
      const user: UserLoginDTO = {
        email: "lastName@gmail.com",
        password: "password",
      };
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const data = await loginUser(user, next);
        expect(data).to.be.an("string");
      } catch {
        expect.fail("Login should not throw an error");
      }
    });
  });
});
