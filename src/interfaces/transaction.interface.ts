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
    balanceBefore: number;
    balanceAfter: number;
    amount: number;
}
