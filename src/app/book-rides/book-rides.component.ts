import { Component, OnInit } from '@angular/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormGroup, NgForm, } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { BookrideService } from '../book-rides/bookride.service';
import { MapService } from '../commonServices/map.service';
import { StorageService } from '../commonServices/storage.service';
import { error } from 'util';
import { ShowRideResponse } from '../interfaces/showRidesResponse.interface';
import { ShowRideDataResponse } from '../interfaces/showrideDataResponse.interface';
import { DistanceMatrixResponse } from '../interfaces/distanceMatrixResponse';
import { BookingResponse } from '../interfaces/bookingResponse';
import { AppConstants } from '../utils/appConstants';

declare const google: any;
const directionsDisplay = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();

@Component({
  selector: 'app-book-rides',
  templateUrl: './book-rides.component.html',
  styleUrls: ['./book-rides.component.css']
})
export class BookRidesComponent implements OnInit {

  constructor(
    private bookrideService: BookrideService,
    private mapService: MapService,
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private datePipe: DatePipe,
  ) { }

  private travelForm: FormGroup;
  private appConstants = AppConstants;
  private showRides: ShowRideDataResponse;
  private rideFound = false;
  private today;
  private future;
  private currentDate = new Date();
  public todayDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  public futureLimitDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 3, this.currentDate.getDate());
  private dateMissMatch = false;
  ngOnInit() {
    this.createTravelFormControl();
    $('#result').html(
      `<div class="alert alert-success alert-dismissable text-white" style="background:#5bb85b">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong class="display-5">Search Results & Route Map Will Be Shown Below!<strong>
      </div>`
    );
  }

  /*function to get the form build for seracching offered rides*/
  createTravelFormControl(): void {
    this.bookrideService.createTravelFormControl()
      .subscribe(
      (form: FormGroup) => {
        this.travelForm = form;
      }
      );
  }

  /* Function to check whether date provided is between the correct range */
  getEnteredDate(enteredDate) {
    const date = this.datePipe.transform(enteredDate, 'yyyy-MM-dd');
    const newDate = new Date(date);
    this.today = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
    const todayDate = new Date(this.todayDate);
    this.future = this.datePipe.transform(this.futureLimitDate, 'yyyy-MM-dd');
    const futureDate = new Date(this.futureLimitDate);
    if ((newDate.getTime() > futureDate.getTime()) || (newDate.getTime() < todayDate.getTime())) {
      this.dateMissMatch = true;
    } else {
      this.dateMissMatch = false;
    }
  }

  /*function to get offered rides and show google maps on successful searches*/
  findRides() {
    const request = {
      origin: $('#originInput').val(),
      destination: $('#destinationInput').val(),
      travelMode: 'DRIVING'
    };
    const travelData = {
      travelDate: $('#journeyDate').val(),
      searchRadius: $('#pickupRadius').val(),
    };
    this.travelForm.reset();
    if (request.origin !== '' && request.destination !== '' && travelData.travelDate !== '' && travelData.searchRadius !== '') {
      /** function to fetch details of ride availa
       * @returns { ShowridesResponse }response
       */
      this.bookrideService.getRides(request, travelData)
        .subscribe(response => {
          if (response.success) {
            let initMap = {
              center: new google.maps.LatLng(21.86, 76.89),
              zoom: 6,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false
            };
            /*initializing google map direction using the locations given while searching*/
            let map = new google.maps.Map(document.getElementById('googleMap'), initMap);
            directionsDisplay.setMap(map);
            this.showRides = response.data;
            $('#result').html(
              `<div class="alert alert-success alert-dismissable text-white" style="background:#563d7c">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong class="display-5">Search Results & Route Map<strong>
            </div>`
            );
            directionsService.route(request, function (mapData, status) {
              if (status === 'OK') {
                directionsDisplay.setDirections(mapData);
              } else {
                alert(AppConstants.staticPageContent.directionAlert + status);
              }
            });
          }
        }, err => {
          $('#result').html(
            `<div class="alert alert-danger alert-dismissable text-white" style="background:#cc3400">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong class="display-5">OOPS!!</strong> No Results Matching Your Search!!.
        </div>`
          );
        });
    } else if (request.origin === '' || request.destination === '' || travelData.travelDate === '' || travelData.searchRadius === '') {
      alert(AppConstants.staticPageContent.fieldAlert);
    }
  }
  /*function to book rides*/
  bookRide() {
    const rideId = localStorage.getItem('RideId');
    this.removeRideId();
    this.bookrideService.bookRides(rideId)
      .subscribe((response: BookingResponse) => {
        alert(response.message);
        if (response.success) {
          this.rideFound = true;
        }
      }, err => {
        alert(err.error);
      });
  }
  /* function to redirect to dashboard */
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  /*function to store Ride Id to local storage*/
  saveRideId(rideId) {
    this.storageService.setRideId('RideId', rideId);
  }
  /*function to remove Ride Id from local Storage*/
  removeRideId() {
    this.storageService.removeValue('RideId');
  }
}

