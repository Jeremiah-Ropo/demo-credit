export enum IStatus {
    success = "success",
    failed = "failed",
    pending = "pending",
}
export interface ITransaction {
    walletId: string;
    id?: number;
    transactionType: string;
    transactionStatus: IStatus;
    reference: string;
    balanceBefore: number;
    balanceAfter: number;
    amount: number;
}
