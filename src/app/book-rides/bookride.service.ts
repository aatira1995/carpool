import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppConstants } from '../utils/appConstants';
import { StorageService } from '../commonServices/storage.service';
import { LoginResponse } from '../interfaces/loginresponse.interface';
import { ShowRideResponse } from '../interfaces/showRidesResponse.interface';
import { BookingResponse } from '../interfaces/bookingResponse';

@Injectable()
export class BookrideService {

  constructor(private fb: FormBuilder, private http: HttpClient, private storageService: StorageService, private datePipe: DatePipe) { }

  /*building a travel form control*/
  createTravelFormControl(): Observable<FormGroup> {
    return of(this.fb.group({
      'origin': [''],
      'destination': [''],
      'date': [''],
      'radius': ['']
    }
    )
    );
  }
  /*API call for showing offered rides*/
  getRides(request, travelData) {
    const origin = (request.origin).split(',');
    const destination = (request.destination).split(',');
    const user: LoginResponse = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders(
      {
        'Authorization': user.data.id
      });
    const date = this.datePipe.transform(travelData.travelDate, 'yyyy-MM-dd');
    // tslint:disable-next-line:max-line-length
    return this.http.get(AppConstants.showRidesUrl + origin[0] + '/' + destination[0] + '/' + travelData.searchRadius + '/' + date, { headers: headers })
      .map((response: ShowRideResponse) => {
        return response;
      }, error => {
        return error;
      });

  }
  /*API call for booking a ride*/
  bookRides(rideId: string) {
    const user: LoginResponse = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': user.data.id
      });
    // tslint:disable-next-line:max-line-length
    return this.http.post(AppConstants.bookRidesUrl, JSON.stringify({ 'rideId': rideId }), { headers: headers })
      .map(bookingResponse => {
        return bookingResponse;
      }, error => {
        return error;
      }
      );
  }

}
