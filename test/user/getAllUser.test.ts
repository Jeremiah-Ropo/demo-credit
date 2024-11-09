import * as chai from "chai";

const { expect } = chai;
import { getAllUsers } from "../../src/services/user.services";

describe("GetAllUsers Function", () => {
  describe("GET ALL Users", () => {
    it("should GET ALL users", async () => {
      const query = {
        id: 3,
      };
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const data = await getAllUsers(query, next);
        expect(data).to.be.an("object");
      } catch {
        expect.fail("GET ALL User should not throw an error");
      }
    });
  });
});
