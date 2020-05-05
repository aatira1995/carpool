import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppConstants } from '../utils/appConstants';
import { RegisterResponse } from '../interfaces/registerresponse.interface';

@Injectable()

export class RegisterService {

  isPasswordMatch = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  /* Returns true if password and confirmpassword matches else return false */
  matchPassword(password, confirmPassword): Observable<boolean> {
    if (password === confirmPassword) {
      this.isPasswordMatch = true;
    } else {
      this.isPasswordMatch = false;
    }
    return of(
      this.isPasswordMatch ? true : false
    );
  }

  /* Function that return the form build for registration */
  createRegisterFormControl(): Observable<FormGroup> {
    return of(this.fb.group({
      'name': [''],
      'email': [''],
      'phone': [''],
      'password': [''],
      'confirmPassword': ['']
    },
    )
    );
  }

  /* Function that save the registration form values and return response from  the server */
  saveUserDetails(registerFormValues: Object): Observable<RegisterResponse> {
    return this.http.post(AppConstants.registerUrl, registerFormValues)
      .map(
      (response: RegisterResponse) => {
        if (response.success) {
          this.router.navigate(['/login']);
        }
        return response;
      },
      (error) => {
        return error;
      }
      );
  }
}
