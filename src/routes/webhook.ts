import TransactionController from '../controllers/webhook.controllers';
import { Router } from 'express';
import { Container } from 'typedi';
// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const webhookController = Container.get(TransactionController);

// We use express.Router() to create a new router object
const router = Router();

router.post('/paystack', webhookController.paystackWebhook);

export default router;