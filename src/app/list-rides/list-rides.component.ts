import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorsComponent } from '../errors/errors.component';

import { AppConstants } from '../utils/appConstants';
import { OfferedRidesResponse } from '../interfaces/getofferedridesresponse.interface';
import { BookedRidesResponse } from '../interfaces/getbookedrides.interface';
import { DeleteRideResponse } from '../interfaces/deleterideresponse.interface';
import { BookedUsersResponse } from '../interfaces/getbookedusers.interface';

import { ListRidesService } from './list-rides.service';
import { EditService } from '../commonServices/edit.service';

@Component({
  selector: 'app-list-rides',
  templateUrl: './list-rides.component.html',
})

export class ListRidesComponent implements OnInit {

  @ViewChild('listBookedModal') listBookedModal: ElementRef;
  @ViewChild('noBookedModal') noBookedModal: ElementRef;
  @ViewChild('deleteOfferModal') deleteOfferModal: ElementRef;

  private appConstants = AppConstants;
  fetchedOfferedRides: Object = [{}];
  fetchedBookedRides: Object;
  bookedUsers: Array<Object> = [{}];
  private hideModalButton = true;
  private noBookedUsers = false;
  private rideId: string;
  private offeredRideId: string;

  constructor(private listRideService: ListRidesService, private editService: EditService, private router: Router) { }

  ngOnInit() {
    this.getOfferedRides();
    this.getBookedRides();
  }

  /* Get details of rides offered by logged in user */
  getOfferedRides() {
    this.listRideService.getOfferedRides()
      .subscribe(
      (offeredRides: OfferedRidesResponse) => {
        this.fetchedOfferedRides = offeredRides['data'];
      }
      );
  }

  /* Get details of rides booked by logged in user */
  getBookedRides() {
    this.listRideService.getBookedRides()
      .subscribe(
      (BookedRides: BookedRidesResponse) => {
        this.fetchedBookedRides = BookedRides['data'];
      }
      );
  }

  /* Assign the id of ride to a variable and open a confirmation dailog for deleting the ride offered */
  passOfferedRideId(id) {
    this.offeredRideId = id;
    this.deleteOfferModal.nativeElement.click();
  }

  /* Cancel offered rides by the user */
  deleteOfferedRide() {
    this.listRideService.deleteRides(this.offeredRideId)
      .subscribe(
      (response: DeleteRideResponse) => {
        if (response.success) {
          alert(response.data.message);
          this.getOfferedRides();
        }
      },
      (error) => {
        alert(error.error.error);
      });
  }

  /* Function that fetch the users who have booked a particular ride */
  getBookedUsers(rideId): void {
    this.rideId = rideId;
    this.listRideService.getBookedOnes(rideId)
      .subscribe(
      (usersBooked: BookedUsersResponse) => {
        this.bookedUsers = usersBooked['data'];
        this.listBookedModal.nativeElement.click();
      },
      (error) => {
        if (error.error.error === 'No Booking So Far') {
          this.noBookedUsers = true;
          this.noBookedModal.nativeElement.click();
        }
      }
      );
  }

  /* Cancel booked rides by the user */
  deleteBookedRide(id: string) {
    this.listRideService.deleteRides(id)
      .subscribe(
      (response: DeleteRideResponse) => {
        if (response.success) {
          alert(response.data.message);
          this.getBookedRides();
        }
      },
      (error) => {
        alert(error.error.error);
      });
  }

  passOfferRideId() {
    this.editService.acceptOfferId(this.rideId);
    this.router.navigate(['/editRide']);
  }

  linkToOfferRide() {
    this.editService.clearRideId();
    this.router.navigate(['/offerRide']);
  }

  linkToBookRide() {
    this.router.navigate(['/bookRide']);
  }
}
