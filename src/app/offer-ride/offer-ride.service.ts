import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { StorageService } from '../commonServices/storage.service';

import { AppConstants } from '../utils/appConstants';
import { CreateRideResponse } from '../interfaces/createrideresponse.interface';
import { EditRideResponse } from '../interfaces/editrideresponse.interface';

@Injectable()
export class OfferRideService {

  constructor(private fb: FormBuilder, private http: HttpClient, private storageService: StorageService) { }

  /* Return the form build for entering details of a ride the user wish to offer*/
  createOfferRideFormControl(): Observable<FormGroup> {
    return of(this.fb.group({
      'vehicleId': [''],
      'fromLocation': [''],
      'toLocation': [''],
      'checkpoints': [''],
      'seatsAvailable': [''],
      'cost': [''],
      'isActive': [''],
      'rideDate': [''],
    },
    )
    );
  }

  /* Create a new ride by passing the values provided by the user */
  createNewRide(offerRideFormValues): Observable<CreateRideResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.post(AppConstants.createRideUrl, offerRideFormValues, { headers: headers })
      .map(
      (response: CreateRideResponse) => {
        return response;
      },
      (error) => {
        return error;
      }
      );
  }

  editExistingRide(editRideFormValues): Observable<EditRideResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.put(AppConstants.updateRideUrl, editRideFormValues, { headers: headers })
      .map(
      (response: EditRideResponse) => {
        return response;
      },
      (error) => {
        return error;
      }
      );
  }

}
