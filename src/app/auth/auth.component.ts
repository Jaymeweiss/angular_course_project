import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  error: string = null;
  authObservable: Observable<AuthResponseData>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      this.authObservable = this.authService.logIn(form.value.email, form.value.password);
    } else {
      this.authObservable = this.authService.signUp(form.value.email, form.value.password);
    }
    this.authObservable.subscribe(
      responseData => {
        console.log(responseData);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      });

    form.reset();
  }
}
