import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../login/login.service';
import { StorageService } from '../commonServices/storage.service';
import { AppConstants } from '../utils/appConstants';
import { LoginResponse } from '../interfaces/loginresponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private appConstants = AppConstants;

  constructor(
    private router: Router,
    private loginFormService: LoginService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.createLoginFormControl();
  }

  /* Function to build the login form */
  createLoginFormControl(): void {
    this.loginFormService.createLoginFormControl()
      .subscribe(
      (form: FormGroup) => {
        this.loginForm = form;
      }
      );
  }

  /* Function to get the access token for logged in user after submitting the Login form values*/
  onLoginFormSubmit(formForLogin: NgForm) {
    this.loginFormService.saveLoginDetails(formForLogin.value)
      .subscribe(
      (response: LoginResponse) => {
        if (response.success) {
          this.storageService.setValue(AppConstants.localstorageLoginFeed, response);
          this.router.navigate(['/dashboard']);
        }
      },
      err => {
        alert(err.error.error);
      });
  }
}
