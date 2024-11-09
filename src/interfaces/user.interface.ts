export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    last_login: Date;
    walletId: string;
    deleted: boolean;
    blackListed: boolean;
}
  
export interface UserInputDTO { 
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    karmaIdentity?: string;
};

export interface UserLoginDTO { 
    email: string;
    password: string;
};
