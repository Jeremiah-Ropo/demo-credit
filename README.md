# DEMO CREDIT - repo

- Description: DEMO-CREDIT is a mobile lending app that requires wallet functionality.

### To view the api documentation
- You might need a postman deskop application installed and a good network connection to run it. Click 👉 [api documentation](https://documenter.getpostman.com/view/33944170/2sAY52ceth)

#### Basic Database design
- Database used: MySQL (Knex ORM)

## Usage

- Clone repository using command `git clone https://github.com/Jeremiah-Ropo/demo-credit.git`
- Change folder into the cloned folder using the command `cd demo-credit`
- Install project dependencies using the command `yarn install` or `npm install`
- Run `yarn dev` or `npm run dev` to start the development server

## How To Contribute

- Create a new branch with `git checkout -b [branch-name]`. Your branch name should describe the feature you are implementing

```bash
git checkout -b login-with-email
```

- After making changes, run `git add .` to stage all of them or `git add [filename]` to add only specific files.
- Commit your changes by running `git commit` providing a descriptive commit message. e.g

```bash
git commit -m "added login with email"
```

- Push update to remote branch with `git push origin [your-branch-name]`. e.g

```bash
git push origin login-with-email
```
> ## Content

> **User Account**
* [Login](#login)
* [Registration](#registration)
* [Get All User](#get-all-users)
* [Get User By Id](#get-user-by-id)
* [Update A User](#update-user)
* [Delete A User](#delete-a-user)

> **User Wallet**
* [Bank Transfer](#bank-transfer)
* [Create Wallet](#create-wallet)
* [Fund Wallet](#fund-wallet)
* [Get User Wallet](#get-user-wallet)
* [Wallet to Wallet](#wallet-to-wallet)


> **Interfaces**
* [User](#User-Interface)
* [Wallet](#Wallet-Interface)
* [Transaction](#Transaction-Interface)

**Types**
* [JwtPayload](#JwtPayload)

###### Base Url
https://jeremiah-lendsqr-be-test-f29ef1911965.herokuapp.com


# Interfaces

### User Interface
The following describes the properties of the `IUser` interface:

#### IUser
| Property       | Type      | Description                              |
|----------------|-----------|------------------------------------------|
| `id`           | number    | Unique identifier for the user           |
| `firstName`    | string    | User's first name                        |
| `lastName`     | string    | User's last name                         |
| `email`        | string    | User's email address                     |
| `password`     | string    | User's password                          |
| `last_login`   | Date      | Date and time of the last login          |
| `walletId`     | string    | Unique identifier for the user's wallet  |
| `deleted`      | boolean   | Account deletion status                  |
| `blackListed`  | boolean   | Blacklist status of the user             |

#### UserInputDTO
| Property         | Type     | Description                               |
|------------------|----------|-------------------------------------------|
| `firstName`      | string   | First name of the user                    |
| `lastName`       | string   | Last name of the user                     |
| `email`          | string   | Email address of the user                 |
| `password`       | string   | Password for the user account             |
| `karmaIdentity`  | string   | Optional identifier for Karma integration |

#### UserLoginDTO
| Property    | Type     | Description                          |
|-------------|----------|--------------------------------------|
| `email`     | string   | Email address of the account         |
| `password`  | string   | Password of the account              |

### Wallet Interface
The following describes the properties of the `IWallet` interface:

#### IWallet
| Property       | Type      | Description                              |
|----------------|-----------|------------------------------------------|
| `userId`       | [IUser](#IUser)| User's unique ID                    |
| `walletName`   | string    | User's wallet name                       |
| `walletBalance`| number    | User's wallet balance                    |
| `walletId`     | string    | User's wallet id                         |
| `freezed`      | boolean   | Freeze wallet                            |

#### WalletInputDTO
| Property       | Type      | Description                              |
|----------------|-----------|------------------------------------------|
| `userId`       | [IUser](#IUser)| User's unique ID                    |
| `walletName`   | string    | User's wallet name                       |
| `walletId`     | string    | User's wallet id                         |

#### WalletToWalletInputDTO
| Property       | Type      | Description                              |
|----------------|-----------|------------------------------------------|
| `email`       | string     | User's email                             |
| `amount`      | number    | Amount                                    |
| `walletId`    | string    | User's wallet id                          |

### Transaction Interface
The following describes the properties of the `ITransaction` interface:

#### EStatus
| Value      | Description                        |
|------------|------------------------------------|
| `Pending`  | The transaction is pending approval|
| `Success`  | The transaction was successful     |
| `Failed`   | The transaction failed             |

#### ITransaction
| Property           | Type      | Description                              |
|--------------------|-----------|------------------------------------------|
| `id?(optional)`    | number    | Transaction's unique ID                  |
| `transactionType`  | string    | Transaction type(fund/bank transfer)     |
| `transactionStatus`| [EStatus](#estatus) | Transaction Status             |
| `walletId`         | string    | User's wallet id                         |
| `reference`        | string   | Transaction Reference                     |
| `balanceBefore`    | number    | User's wallet balance before             |
| `balanceAfter`     | number   | User's wallet balance after               |
| `amount`           | number   | Amount of Transaction                     |

#### JwtPayload
| Property           | Type      | Description                              |
|--------------------|-----------|------------------------------------------|
| `user_id`          | number    | User's unique ID                         |
| `email`            | string    | User's email                             |


# Account

### Login
> **POST** /user/login

Parameter: [LoginPayload](#UserLoginDTO)
#### Sample Response
> Status : 200 Ok
> Location : [BASE_URL](#base-url)/user/login

The response includes a `data` of types string.
```json
{
  "message" : "string",
  "data" : "token"
}
```
### Login Error messages
| Status code |          Message         |
|-------------|--------------------------|
| 404         | User does not exist      |
| 400         | Invalid email or password|

[Back to top](#content)
***

### Registration
> **POST** /user/register

Parameter: [RegisterPayload](#userInputDTO)
#### Sample Response
> Status : 201 Ok
> Location : [BASE_URL](#base-url)/user/register

The response includes a `data` object of type [`IUser`](#iuser).
```json
{
  "message" : "string",
  "data" : { }
}
```
### Register Error messages
| Status code |          Message         |
|-------------|--------------------------|
| 409         | User already exists      |
| 403         | User is blacklisted      |
| 500         | User creation failed     |
| 500         | Internal Server Error    |

[Back to top](#content)
***

### Get All Users
> **GET** /user/

Parameter : [Query]Partial<[IUser](#IUser)>

#### Sample Response
> Status : 200 Ok
> Location : [BASE_URL](#base-url)/user/

The response includes a `data` object of array of type [`IUser`](#IUser).
```json
{
  "message" : "message",
  "data" : {}
}
```
[Back to top](#content)
***

### Delete a user
> **DELETE** /user/

Parameter: email from req.[jwtPayload](#jwtpayload);


#### Sample Response
> Status: 201 Created  
> Location: [BASE_URL](#base-url)/user/

The response includes a `data` object of type [`IUser`](#iuser).
```json
{
  "message" : "message",
  "data" : {}
}
```
### Delete User Error messages
| Status code |          Message         |
|-------------|--------------------------|
| 404         | User does not exist      |

[Back to top](#content)
***
### Update A User
> **PATCH** /user/

Parameter: email from req.[jwtPayload](#jwtpayload);
#### Sample Response
> Status : 200 Ok
> Location : [BASE_URL](#base-url)/user/

The response includes a `data` object of type [`IUser`](#iuser).
```json
{
  "message" : "message",
  "data" : { }
}
```
### Update User Error messages
| Status code |          Message         |
|-------------|--------------------------|
| 404         | User does not exist      |

[Back to top](#content)
***

### Get A User By Id
> **POST** /forgotPassword

Parameter: email from req.[jwtPayload](#jwtpayload);

#### Sample Response
> Status : 200 Ok
> Location : [BASE_URL](#base-url)/forgotPassword

The response includes a `data` object of type [`IUser`](#iuser).
```json
{
  "message" : "message",
  "data" : { }
}
```
### Get A User Error messages
| Status code |          Message         |
|-------------|--------------------------|
| 404         | User does not exist      |

[Back to top](#content)
***

### Bank Transfer
> **POST** /wallet/bank-transfer

Parameters: 
###### initializeTransferPayload
| Property           | Type      | Description                              |
|--------------------|-----------|------------------------------------------|
| `name`             | string    | beneficial account name                  |
| `email`            | string    | User's email                             |
| `walletId`         | string    | User's wallet id                         |
| `accountNumber`    | string    | beneficial account number                |
| `bankCode`         | string    | bank account number code                 |
| `reason`           | string    | Transaction's reason                     |
| `amount`           | number    | Amount of Transaction                    |

#### Sample Response
> Status : 200 Ok
> Location : [BASE_URL](#base-url)//wallet/bank-transfer

```json
{
  "message" : "message",
  "data" : "paystack.authorization_url"
}
```

### Wallet to Wallet Error messages
| Status code |             Message              |
|-------------|----------------------------------|
| 404         | Wallet not found                 |
| 400         | Insufficient balance             |
| 500         | Internal Server Error            |

[Back to top](#content)
***

### Create Wallet
> **POST** /wallet/

Parameters: [createWalletPayload](#walletInputDTO)

#### Sample Response
> Status : 201 Ok(created)
> Location : [BASE_URL](#base-url)/wallet/

The response includes a `data` object of type [`IWallet`](#iwallet).
```json
{
  "message" : "message",
  "data" : {}
}
```

### Create Wallet Error messages
| Status code |          Message         |
|-------------|--------------------------|
| 409         | User already has a wallet|
| 404         | User does not exists     |
| 500         | User creation failed     |
| 500         | Internal Server Error    |

[Back to top](#content)
***

### Fund Wallet
> **POST** /wallet/fund-wallet

Parameters: 
###### fundWalletPayload
| Property           | Type      | Description                              |
|--------------------|-----------|------------------------------------------|
| `paymentMode`      | string    | Transaction type(fund/bank transfer)     |
| `email`            | string    | User's email                             |
| `walletId`         | string    | User's wallet id                         |
| `amount`           | number    | Amount of Transaction                    |

#### Sample Response
> Status : 200 Ok
> Location : [BASE_URL](#base-url)/wallet/fund-wallet

```json
{
  "message" : "message",
  "data" : "paystack.authorization_url"
}
```
### Fund Wallet Error messages
| Status code |          Message         |
|-------------|--------------------------|
| 404         | Wallet not found         |
| 500         | Internal Server Error    |

[Back to top](#content)
***

### Get User Wallet
> **GET** /wallet/user

Parameter: email from req.[jwtPayload](#jwtpayload);


#### Sample Response
> Status : 200 Ok
> Location : [BASE_URL](#base-url)/wallet/user

The response includes a `data` object of type [`IWallet`](#iwallet).
```json
{
  "message" : "string",
  "data" : { }
}
```

### Get User Wallet Error messages
| Status code |          Message         |
|-------------|--------------------------|
| 404         | Wallet not found         |
| 500         | Internal Server Error    |

[Back to top](#content)
***

### Wallet to Wallet
> **POST** /wallet/wallet-to-wallet

Parameter: [walletToWalletPaylaod](#walletToWalletInputDTO)

#### Sample Response
> Status : 200 Ok
> Location : [BASE_URL](#base-url)/wallet/wallet-to-wallet

The response includes a `data` object of type [`IWallet`](#iwallet).
```json
{
  "message" : "message",
  "data": {}
}
```

### Wallet to Wallet Error messages
| Status code |             Message              |
|-------------|----------------------------------|
| 404         | User wallet does not exist       |
| 403         | You can't send money to yourself |
| 400         | Insufficient balance             |
| 500         | Internal Server Error            |

[Back to top](#content)
***

###### engine: nodejs, language: typescript, database: mysql with knex.


