import { expect } from "chai";

import { createWallet } from "../../src/services/wallet.services";

describe("createWallet Function", () => {
  describe("create a Wallet", () => {
    it("should create a new Wallet", async () => {
        const email = "lastName01@gmail.com";
  
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const data = await createWallet(email, next);
        expect(data).to.be.an("object");
      } catch {
        expect.fail("Create Wallet should not throw an error");
      }
    });
  });
});
