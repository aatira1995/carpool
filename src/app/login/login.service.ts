import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppConstants } from '../utils/appConstants';
import { LoginResponse } from '../interfaces/loginresponse.interface';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  /* Login form details are passed and retrive access token and return it */
  saveLoginDetails(loginFormValues: Object): Observable<LoginResponse> {
    return this.http.post(AppConstants.loginUrl, loginFormValues)
      .map(
      (response: LoginResponse) => {
        return response;
      },
      err => {
        return err;
      });
  }

  /* Create the login form*/
  createLoginFormControl(): Observable<FormGroup> {
    return of(this.fb.group({
      'email': [''],
      'password': ['']
    }
    )
    );
  }

}
