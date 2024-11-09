import { expect } from "chai";

import { initializeTransfer } from "../../src/services/wallet.services";

describe("initializeTransfer Function", () => {
  describe("initialize a Transfer", () => {
    it("should initialize a transfer", async () => {
        const payload: any = {
            amount: 100,
            email: "support@blinkcash.ng",
            walletId: "1551914-wallet_id",
            reason: "Test",
            paymentMode: "bank_transfer",
        }
  
      const next = (error) => {
        console.error("Error in nextFunction:", {
          message: error.message
        });
      };
      try {
        const data = await initializeTransfer(payload, next);
        expect(data).to.be.an("object");
      } catch {
        expect.fail("Initialize a transfer should not throw an error");
      }
    });
  });
});
