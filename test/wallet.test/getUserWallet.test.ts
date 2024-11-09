import { expect } from "chai";

import { getUserWallet } from "../../src/services/wallet.services";

describe("getUserWallet Function", () => {
  describe("GET a Wallet", () => {
    it("should GET a new Wallet", async () => {
        const email = "support@blinkcash.ng";
  
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const data = await getUserWallet(email, next);
        expect(data).to.be.an("object");
      } catch {
        expect.fail("GET Wallet should not throw an error");
      }
    });
  });
});