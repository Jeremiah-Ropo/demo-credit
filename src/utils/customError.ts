class CustomError extends Error {
  public status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.status = statusCode;
    this.message = message;
  }
//   get getStatusCode(): number {
//     return this.status;
//   }
//   get getResponseBody() {
//     return {
//       errorMessage: this.message,
//     };
//   }
}

export { CustomError };
