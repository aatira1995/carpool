import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { StorageService } from '../commonServices/storage.service';
import { AppConstants } from '../utils/appConstants';

import { OfferedRidesResponse } from '../interfaces/getofferedridesresponse.interface';
import { BookedRidesResponse } from '../interfaces/getbookedrides.interface';
import { DeleteRideResponse } from '../interfaces/deleterideresponse.interface';
import { BookedUsersResponse } from '../interfaces/getbookedusers.interface';

@Injectable()
export class ListRidesService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  /* Return the details of offered rides by the logged user */
  getOfferedRides(): Observable<OfferedRidesResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.get(AppConstants.getOfferedRidesUrl, { headers: headers })
      .map(
      (response: OfferedRidesResponse) => {
        return response;
      }
      );
  }

  /* Return the details of booked rides by the logged user */
  getBookedRides(): Observable<BookedRidesResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.get(AppConstants.getBookedRidesUrl, { headers: headers })
      .map(
      (response: BookedRidesResponse) => {
        return response;
      }
      );
  }

  /* Function that returns the users details who had booked that paticular ride */
  getBookedOnes(rideId): Observable<BookedUsersResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.get(AppConstants.getBookedDetailsUrl + rideId, { headers: headers })
      .map(
      (response: BookedUsersResponse) => {
        return response;
      }
      );
  }

  /* Cancel a ride by the user */
  deleteRides(rideId: string): Observable<DeleteRideResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    const body = {
      id: rideId
    };
    return this.http.request('delete', AppConstants.cancelRidesUrl, { body: body, headers: headers })
      .map(
      (response: DeleteRideResponse) => {
        return response;
      },
      (error) => {
        return error;
      }
      );
  }
}
