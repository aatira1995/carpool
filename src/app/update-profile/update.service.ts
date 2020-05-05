import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { StorageService } from '../commonServices/storage.service';

import { AppConstants } from '../utils/appConstants';
import { ProfileResponse } from '../interfaces/account.interface';
import { UpdateProfileResponse } from '../interfaces/updateProfile.interface';

@Injectable()
export class UpdateService {

  constructor(private http: HttpClient, private fb: FormBuilder, private storageService: StorageService) { }

  /* Return the form build for entering details for updation */
  createUpdateFormControl(): Observable<FormGroup> {
    return of(this.fb.group({
      'name': [''],
      'phone': [''],
      'address': [''],
    },
    )
    );
  }

  /* Return the form build for changing password for updation */
  createChangePasswordControl(): Observable<FormGroup> {
    return of(this.fb.group({
      'password': [''],
      'newPassword': ['']
    },
    )
    );
  }

  /* Return the fetched profile details of logged in user */
  getProfileDetails(): Observable<ProfileResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.get(AppConstants.accountUrl, { headers: headers })
      .map(
      (response: ProfileResponse) => {
        return response;
      });
  }

  /* Return response after updating the user profile */
  updateUserDetails(updateFormValues: Object): Observable<UpdateProfileResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.put(AppConstants.updateProfileUrl, updateFormValues, { headers: headers })
      .map(
      (response: UpdateProfileResponse) => {
        return response;
      },
      (error) => {
        return error;
      }
      );
  }

  /* return the response after changing the password of logged user */
  changePassword(changePasswordFormValues: Object): Observable<UpdateProfileResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.put(AppConstants.updateProfileUrl, changePasswordFormValues, { headers: headers })
      .map(
      (response: UpdateProfileResponse) => {
        return response;
      },
      (error) => {
        return error;
      }
      );
  }
}
