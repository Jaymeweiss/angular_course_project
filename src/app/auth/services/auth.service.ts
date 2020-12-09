import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../user.model';
import {Router} from '@angular/router';

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
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {
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
      }).pipe(catchError(AuthService.handleErrorResponse), tap(responseData => {
      this.handleAuthentication(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn,
        responseData.refreshToken);
    }));
  }

  logIn(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMsLy4or70g67sovfuTmunQoDvXocnjHk',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(AuthService.handleErrorResponse), tap(responseData => {
      this.handleAuthentication(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        +responseData.expiresIn,
        responseData.refreshToken);
    }));
  }

  refreshToken(refreshToken: string): void {
    this.httpClient.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyBMsLy4or70g67sovfuTmunQoDvXocnjHk', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).subscribe();
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin(): void {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
      _refreshToken: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const expirationDate =  new Date(userData._tokenExpirationDate);
    const loadedUser = new User(userData.email, userData.id,
      userData._token, expirationDate, userData._refreshToken);
    if (loadedUser.token) {
      const expirationDuration = new Date(expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number, refreshToken: string): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate, refreshToken);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
