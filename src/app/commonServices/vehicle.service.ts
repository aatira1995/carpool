import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { StorageService } from '../commonServices/storage.service';

import { AppConstants } from '../utils/appConstants';
import { VehicleDetailsResponse } from '../interfaces/getvehicleresponse.interface';
import { VechileDetailsEnteredResponse } from '../interfaces/createvehicledetails.interface';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient, private storageService: StorageService, private fb: FormBuilder) { }

  /* Return the form build for entering vehicle details */
  createVehicleFormControl(): Observable<FormGroup> {
    return of(this.fb.group({
      'vehicleNumber': [''],
      'vehicleName': [''],
      'seatsAvailable': [''],
    })
    );
  }

  /* Function that add a new vehicle to the by passing the values entered by logged in user */
  saveVehicleDetails(vehicleDetailsFormValues: Object): Observable<VechileDetailsEnteredResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.post(AppConstants.vehicelDetailsEnterUrl, vehicleDetailsFormValues, { headers: headers })
      .map(
      (response: VechileDetailsEnteredResponse) => {
        return response;
      },
      (error) => {
        return error;
      }
      );
  }

  /* Function that returns the details of vehicles the user had already added */
  getVehiclesOfUser(): Observable<VehicleDetailsResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.get(AppConstants.vehicleDetailsGetUrl, { headers: headers })
      .map(
      (response: VehicleDetailsResponse) => {
        return response;
      });
  }

}
