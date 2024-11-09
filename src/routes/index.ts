import { Router } from "express"; 

import userRoutes from "./user";
import walletRoutes from "./wallet";
import webhookRoutes from "./webhook";

const router = Router();

// * Collective routes: Default (index.ts) route
router.use("/user", userRoutes);
router.use("/wallet", walletRoutes);
router.use("/webhook", webhookRoutes)

export default router;