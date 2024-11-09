import { expect } from 'chai';

import { WalletToWalletInputDTO } from '../../src/interfaces';
import { walletToWallet } from '../../src/services/wallet.services';

describe('walletToWallet Function', () => {
  describe('Wallet to wallet', () => {
    it('should do Wallet to Wallet', async () => {
      const payload: WalletToWalletInputDTO = {
        email: 'lastName01@gmail.com',
        walletId: '1551914-wallet_id',
        amount: 10,
      };

      const next = (error) => {
        console.error('Error in nextFunction:', {
          message: error.message,
        });
      };
      try {
        const data = await walletToWallet(payload, next);
        expect(data).to.be.an('object');
      } catch (error) {
        console.error(error);
        expect.fail('GET Wallet should not throw an error');
      }
    });
  });
});
