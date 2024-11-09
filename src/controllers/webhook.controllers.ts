import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { webhookPaystack } from '../services/webhook.services';

@Service()
class WebhookController {
    paystackWebhook = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await webhookPaystack(req, next);
        if (data) {
          res.status(200).send({ message: 'Webhook information', data });
        }
        return;
      } catch (error) {
        next(error);
      }
    };

}
export default WebhookController;
