import { IUser } from ".";

export interface IWallet {
    userId: IUser | number;
    walletName: string;
    walletBalance: number;
    walletId: string;
    freezed: boolean;
}
  
export interface WalletInputDTO { 
    userId: IUser | number;
    walletName: string;
    walletId: string;
};

export interface WalletToWalletInputDTO{
    email: string;
    walletId: string;
    amount: number;
}