export enum EStatus {
    success = "success",
    failed = "failed",
    pending = "pending",
}
export interface ITransaction {
    walletId: string;
    id?: number;
    transactionType: string;
    transactionStatus: EStatus;
    reference: string;
    balanceBefore?: number;
    balanceAfter?: number;
    amount: number;
}

export interface ITransfer {
    email: string;
    amount: number;
    reference: string;
    reason?: string;
    paymentMode: string;
    walletId: string;
    topUp: boolean;
}
