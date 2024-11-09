import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { WalletToWalletInputDTO } from '../interfaces';
import { createWallet, walletToWallet, getUserWallet, paymentCheckout, initializeTransfer } from '../services/wallet.services';

@Service()
class WalletController {
  getUserWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getUserWallet(req.body.email, next);
      if (data) {
        res.status(200).send({ message: 'Wallet retrieved successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };
  createWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await createWallet(req.jwtPayload.email, next);
      if (data) {
        res.status(201).send({ message: 'Wallet created successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };

  walletToWallet = async (req: Request, res: Response, next: NextFunction) => {
      try {
      const wallet: WalletToWalletInputDTO = req.body;
      const data = await walletToWallet(wallet, next);
      if (data) {
        res.status(200).send({ message: 'Wallet logged in successfully', data });
      }
      return;
    } catch (error) {
      next(error);
    }
  };

    fundWallet = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = req.body;
        const data = await paymentCheckout(payload, next);
        if (data) {
          res.status(200).send({ message: 'Payment Checkout Successful', data });
        }
        return;
      } catch (error) {
        next(error);
      }
    };

    bankTransfer = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await initializeTransfer(req.body, next);
        if (data) {
          res.status(200).send({ message: 'Transfer successfully', data });
        }
        return;
      } catch (error) {
        next(error);
      }
    };

}
export default WalletController;
