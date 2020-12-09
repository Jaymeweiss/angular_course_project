export class User {
  constructor(public email: string,
              public id: string,
              // tslint:disable-next-line:variable-name
              private _token: string, private _tokenExpirationDate: Date, private _refreshToken: string) {
  }

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      // call some method to refresh the token on your auth service
      return null;
    }
    return this._token;
  }
}
