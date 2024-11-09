import WalletController from '../controllers/wallet.controllers';
import { Router } from 'express';
import { Container } from 'typedi';
import { checkUserJwt } from '../middlewares/checkUserJwt';
import { checkUser } from '../middlewares/checkUser';

// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const walletController = Container.get(WalletController);

// We use express.Router() to create a new router object
const router = Router();

router.post('/', checkUserJwt, walletController.createWallet);

router.get('/user', [checkUserJwt, checkUser], walletController.getUserWallet);

router.post('/wallet-to-wallet', [checkUserJwt, checkUser], walletController.walletToWallet);

router.post('/fund-wallet', [checkUserJwt, checkUser], walletController.fundWallet);

router.post('/bank-transfer', [checkUserJwt, checkUser], walletController.bankTransfer);

export default router;