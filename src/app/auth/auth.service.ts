import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  private static handleErrorResponse(errorResponse: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'We are unable to log you on at this time';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'There have been too many incorrect attempts. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The email address was not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password entered is incorrect';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account has been disabled';
    }
    return throwError(errorMessage);
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMsLy4or70g67sovfuTmunQoDvXocnjHk',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(AuthService.handleErrorResponse));
  }

  logIn(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMsLy4or70g67sovfuTmunQoDvXocnjHk',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(AuthService.handleErrorResponse));
  }
}
