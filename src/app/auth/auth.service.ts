import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMsLy4or70g67sovfuTmunQoDvXocnjHk',
      {
        email,
        password,
        returnSecureToken: true
      });
  }
}
