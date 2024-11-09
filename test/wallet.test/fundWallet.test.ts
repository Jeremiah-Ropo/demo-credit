import { expect } from "chai";

import { paymentCheckout } from "../../src/services/wallet.services";

describe("paymentCheckout Function", () => {
  describe("paymentCheckout", () => {
    it("should payment checkout", async () => {
        const payload: any = {
            amount: 100,
            email: "support@blinkcash.ng",
            walletId: "1551914-wallet_id",
            paymentMode: "fund",
        }
  
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const data = await paymentCheckout(payload, next);
        expect(data).to.be.an("string");
      } catch {
        expect.fail("payment checkout should not throw an error");
      }
    });
  });
});
