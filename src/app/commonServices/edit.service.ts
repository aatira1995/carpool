import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService } from '../commonServices/storage.service';
import { AppConstants } from '../utils/appConstants';

import { OfferedRidesResponse } from '../interfaces/getofferedridesresponse.interface';
import { SingleRideResponse } from '../interfaces/singlerideresponse.interface';

@Injectable()
export class EditService {

  private offeredRideId: string;
  private fetchedOffered;
  private offeredData = {
    fromLocation: '',
    toLocation: '',
    checkpoints: '',
    seatsAvailable: '',
    rideDate: '',
    cost: '',
    vehicleId: '',
    id: '',
  };

  constructor(private http: HttpClient, private storageService: StorageService) { }

  /* Assign the id of ride to be edited to a variable for future use */
  acceptOfferId(rideId) {
    this.offeredRideId = rideId;
  }

  /* function that clear the values of form while navigating to other components and return back to the page */
  clearRideId() {
    this.offeredRideId = '';
    this.offeredData = {
      fromLocation: '',
      toLocation: '',
      checkpoints: '',
      seatsAvailable: '',
      rideDate: '',
      cost: '',
      vehicleId: '',
      id: '',
    };
  }

  /* Return the details of offered rides by the logged user */
  getOfferedRides() {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    return this.http.get(AppConstants.getOfferedRidesUrl, { headers: headers })
      .map(
      (response: OfferedRidesResponse) => {
        this.fetchedOffered = response['data'];
        for (let i = 0; i < this.fetchedOffered.length; i++) {
          if (this.fetchedOffered[i].id === this.offeredRideId) {
            this.offeredData.fromLocation = this.fetchedOffered[i].fromLocation;
            this.offeredData.toLocation = this.fetchedOffered[i].toLocation;
            this.offeredData.checkpoints = this.fetchedOffered[i].checkpoints;
            this.offeredData.seatsAvailable = this.fetchedOffered[i].seatsAvailable;
            this.offeredData.rideDate = this.fetchedOffered[i].rideDate;
            this.offeredData.cost = this.fetchedOffered[i].cost;
            this.offeredData.vehicleId = this.fetchedOffered[i].vehicleId;
            this.offeredData.id = this.fetchedOffered[i].id;
          }
        }
        return this.offeredData;
      }
      );
  }
}
