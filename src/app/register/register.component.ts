import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { ErrorsComponent } from '../errors/errors.component';

import { AppConstants } from '../utils/appConstants';
import { RegisterService } from './register.service';
import { RegisterResponse } from '../interfaces/registerresponse.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  private appConstants = AppConstants;
  confirmPassword = '';
  password = '';
  isPasswordMatch = true;

  constructor(
    private registerService: RegisterService,
  ) { }

  ngOnInit() {
    this.createRegisterFormControl();
  }

  /* Function that gets a form build for registration */
  createRegisterFormControl(): void {
    this.registerService.createRegisterFormControl()
      .subscribe(
      (form: FormGroup) => {
        this.registerForm = form;
      }
      );
  }

  /* Function that get the password from the form */
  getPassword(password: string) {
    this.password = password;
  }

  /* Function that get the confirmPassword from the form */
  getConfirmPassword(confirmpassword: string) {
    this.confirmPassword = confirmpassword;
  }

  /* Function that gets the value for checking for match of password and confirmpassword */
  checkForPasswordsMatch() {
    this.registerService.matchPassword(this.password, this.confirmPassword)
      .subscribe(
      isPasswordMatch => {
        this.isPasswordMatch = isPasswordMatch;
      }
      );
  }

  /* Pass the values of register form and get the response */
  onRegisterFormSubmit(formForRegister: NgForm): void {
    if (this.isPasswordMatch) {
      this.registerService.saveUserDetails(formForRegister.value)
        .subscribe(
        (response: RegisterResponse) => {
          if (response.success) {
            alert(response.data);
          }
        },
        (error) => {
          alert(error.error.error);
        });
    }
  }
}
