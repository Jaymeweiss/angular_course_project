import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  error: string = null;

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

    } else {
      this.authService.signUp(form.value.email, form.value.password).subscribe(
        responseData => {
          console.log(responseData);
        },
        errorResponse => {
          console.log(errorResponse);
          this.error = 'An error occurred';
        });
    }

    form.reset();
  }
}
