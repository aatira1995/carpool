import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { AppConstants } from '../utils/appConstants';
import { ProfileResponse } from '../interfaces/account.interface';
import { StorageService } from '../commonServices/storage.service';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  /* Function in service that return the fetched profile details */

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
}
