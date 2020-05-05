import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppConstants } from '../utils/appConstants';
import { LogoutResponse } from '../interfaces/logoutresponse.interface';
import { StorageService } from '../commonServices/storage.service';

@Injectable()
export class LogoutService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  /**
    log the user out using the authorization id from local storage
    *
    *@returns { LogoutResponse }
  */
  logOut() {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    if (user) {
      const headers = new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': user.data.id
        });
      return this.http.delete(AppConstants.logoutUrl, { headers: headers })
        .map(
        (response: LogoutResponse) => {
          return response;
        },
        err => {
          return err;
        });
    }
  }
}

