import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ErrorsComponent } from '../errors/errors.component';

import { AppConstants } from '../utils/appConstants';
import { MapService } from '../commonServices/map.service';
import { OfferRideService } from './offer-ride.service';
import { VechileDetailsEnteredResponse } from '../interfaces/createvehicledetails.interface';
import { CreateRideResponse } from '../interfaces/createrideresponse.interface';
import { VehicleDetailsResponse } from '../interfaces/getvehicleresponse.interface';
import { destroyPlatform } from '@angular/core/src/application_ref';
import { VehicleService } from '../commonServices/vehicle.service';
import { EditService } from '../commonServices/edit.service';
import { DistanceMatrixResponse } from '../interfaces/distanceMatrixResponse';
import { OfferedRidesResponse } from '../interfaces/getofferedridesresponse.interface';
import { EditRideResponse } from '../interfaces/editrideresponse.interface';
import { SingleRideResponse } from '../interfaces/singlerideresponse.interface';

declare const google: any;
const directionsDisplay = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css']
})
export class OfferRideComponent implements OnInit {

  private appConstants = AppConstants;
  private vehicleDetailsForm: FormGroup;
  private offerRideForm: FormGroup;
  private vehicles: VehicleDetailsResponse['data'];
  private rideData: object;
  private origin: string;
  private distance;
  private cost;
  private editMode = false;
  private equalToFive = false;
  private ride = {
    checkpoints: '',
    cost: '',
    fromLocation: '',
    id: '',
    rideDate: '',
    seatsAvailable: '',
    toLocation: '',
    vehicleId: '',
  };
  public currentDate = new Date();
  public maxDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 3, this.currentDate.getDate());
  private offeredRideData: Object;
  private originalSeat;
  private userProvidedSeat;
  private initialized = false;
  private dateMissMatch = false;
  private seatMissMatch = false;
  private today;
  private future;

  constructor(
    private offerRideService: OfferRideService,
    private mapService: MapService,
    private router: Router,
    private vehicleService: VehicleService,
    private editservice: EditService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.createVehicleFormControl();
    this.createOfferRideFormControl();
    this.getVehicles();
    this.getOfferedRide();
    let onChangeHandler = () => {
      const travelPoints = {
        source: $('#source').val(),
        destination: $('#destination').val(),
        seatcount: $('#seatsAvailable').val(),
      };
      if (travelPoints.source !== '' && travelPoints.destination !== '' && travelPoints.seatcount !== '') {
        this.calculateRoute(travelPoints);
      }
    };
    $('#source').bind('change', onChangeHandler);
    $('#destination').bind('change', onChangeHandler);
    $('#seatsAvailable').bind('change', onChangeHandler);
    $('#costAlert').html(
      `<div class="alert alert-success alert-dismissable text-white" style="background:#5bb85b">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong class="display-5"> Results & Route Map Will Be Shown Below!<strong>
      </div>`
    );
  }

  /* Get the seat capacity of the selected vehicle */
  getSeatCapacity(vehicleId) {
    this.getVehicles();
    for (let i = 0; i < this.vehicles.length; i++) {
      if (this.vehicles[i].id === vehicleId) {
        this.originalSeat = this.vehicles[i].seatsAvailable;
        this.checkForSeatMatch(this.originalSeat, this.userProvidedSeat);
      }
    }
  }

  /* Get the number of co-travellers for the ride */
  getCoTravellersNumber(value) {
    this.userProvidedSeat = value;
    this.checkForSeatMatch(this.originalSeat, this.userProvidedSeat);
  }

  /* Check whether the co-travellers allowed is less than or equal to seatcapacity of the vehicle */
  checkForSeatMatch(original, userProvided) {
    if (userProvided > original) {
      this.seatMissMatch = true;
    } else {
      this.seatMissMatch = false;
    }
  }

  /* Function to check whether date provided is between the correct range */
  getEnteredDate(enteredDate) {
    const date = this.datePipe.transform(enteredDate, 'yyyy-MM-dd');
    const newDate = new Date(date);
    this.today = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    const todayDate = new Date(this.currentDate);
    this.future = this.datePipe.transform(this.maxDate, 'yyyy-MM-dd');
    const futureDate = new Date(this.maxDate);
    if ((newDate.getTime() > futureDate.getTime()) || (newDate.getTime() < todayDate.getTime())) {
      this.dateMissMatch = true;
    } else {
      this.dateMissMatch = false;
    }
  }

  /* Function to get the form build for entering vehicle details */
  createVehicleFormControl(): void {
    this.vehicleService.createVehicleFormControl()
      .subscribe(
      (form: FormGroup) => {
        this.vehicleDetailsForm = form;
      }
      );
  }

  /* Function to get the form build for offering a ride */
  createOfferRideFormControl(): void {
    this.offerRideService.createOfferRideFormControl()
      .subscribe(
      (form: FormGroup) => {
        this.offerRideForm = form;
      }
      );
  }

  /* Function to get the details of vehicles of logged in user */
  getVehicles(): void {
    this.vehicleService.getVehiclesOfUser()
      .subscribe(
      (vehicles: VehicleDetailsResponse) => {
        this.vehicles = vehicles['data'];
        if (this.vehicles.length === 5) {
          this.equalToFive = true;
        } else {
          this.equalToFive = false;
        }
      }
      );
  }

  /* Fetch data of a single offered ride for populating it in the form for editing*/
  getOfferedRide() {
    this.editservice.getOfferedRides()
      .subscribe(
      (offerRide) => {
        this.ride = offerRide;
        if (this.ride.id) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
      }
      );
  }

  /* Function that passes the details of a new vehicle of logged in user  */
  onVehicleDetailsSubmit(vehicleDetailsForm: NgForm): void {
    this.vehicleService.saveVehicleDetails(vehicleDetailsForm.value)
      .subscribe(
      (response: VechileDetailsEnteredResponse) => {
        if (response.success) {
          this.vehicleDetailsForm.reset();
          this.getVehicles();
          alert(response.message);
        }
      },
      (error) => {
        alert(error.error.error);
      });
  }

  /* Function to get distance data from google distance matrix API & find approx. cost per booking*/
  calculateRoute(travelPoints) {
    this.mapService.getData(travelPoints)
      .subscribe(data => {
        this.rideData = data;
        const distance: string = this.rideData.rows['0'].elements['0'].distance.text;
        const unitLessDistance = distance.split(' ');
        this.distance = unitLessDistance[0];
        const cost = ((this.distance * 15) / travelPoints.seatcount);
        this.cost = Math.round(cost);
        $('input[name=cost]').attr('placeholder', this.cost);
        $('#costAlert').html(
          `<div class="alert alert-success alert-dismissable text-white" style="background:#5bb85b">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong class="display-5">Enter cost/head which is equal to or below the amount shown in the cost/head field!!<strong>
          </div>`
        );
      }
      );
  }

  /* Function that passes the details to offer a new ride and load google map on successfull offering of ride */
  onCreateNewRide(offerRideForm: NgForm): void {
    const offerForm = {
      vehicleId: offerRideForm.value.vehicleId,
      fromLocation: $('#source').val(),
      toLocation: $('#destination').val(),
      checkpoints: $('#checkPoint').val(),
      seatsAvailable: $('#seatsAvailable').val(),
      cost: $('#cost').val(),
      isActive: true,
      rideDate: $('#rideDate').val()
    };
    const editForm = {
      vehicleId: offerRideForm.value.vehicleId,
      fromLocation: $('#source').val(),
      toLocation: $('#destination').val(),
      checkpoints: $('#checkPoint').val(),
      seatsAvailable: $('#seatsAvailable').val(),
      cost: $('#cost').val(),
      isActive: true,
      rideDate: $('#rideDate').val(),
      rideId: this.ride.id,
    };
    if (this.editMode) {
      this.offerRideService.editExistingRide(editForm)
        .subscribe(
        (response: EditRideResponse) => {
          if (response.success) {
            this.offeredRideData = response['data'];
            const waypoints = [];
            const getCheckPoint = $('#checkPoint').val();
            waypoints.push({
              location: getCheckPoint,
              stopover: true
            });
            const request = {
              origin: $('#source').val(),
              destination: $('#destination').val(),
              waypoints: waypoints,
              travelMode: 'DRIVING'
            };
            let initMap = {
              center: new google.maps.LatLng(21.86, 76.89),
              zoom: 6,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false
            };
            let map = new google.maps.Map(document.getElementById('googleMap'), initMap);
            directionsDisplay.setMap(map);
            this.offerRideForm.reset();
            this.offerRideForm.controls.vehicleId.setValue('');
            alert('Edited Successfully');
            directionsService.route(request, function (mapData, status) {
              if (status === 'OK') {
                directionsDisplay.setDirections(mapData);
              } else {
                alert(AppConstants.staticPageContent.directionAlert + status);
              }
            });
          }
        },
        (error) => {
          alert('Not successfull');
        });
    } else {
      this.offerRideService.createNewRide(offerForm)
        .subscribe(
        (response: CreateRideResponse) => {
          if (response.success) {
            this.offeredRideData = response['data'];
            const waypoints = [];
            const getCheckPoint = $('#checkPoint').val();
            waypoints.push({
              location: getCheckPoint,
              stopover: true
            });
            const request = {
              origin: $('#source').val(),
              destination: $('#destination').val(),
              waypoints: waypoints,
              travelMode: 'DRIVING'
            };
            let initMap = {
              center: new google.maps.LatLng(21.86, 76.89),
              zoom: 6,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false
            };
            let map = new google.maps.Map(document.getElementById('googleMap'), initMap);
            directionsDisplay.setMap(map);
            this.offerRideForm.reset();
            this.offerRideForm.controls.vehicleId.setValue('');
            alert(response.message);
            directionsService.route(request, function (mapData, status) {
              if (status === 'OK') {
                directionsDisplay.setDirections(mapData);
              } else {
                alert(AppConstants.staticPageContent.directionAlert + status);
              }
            });
          }
        },
        (error) => {
          alert(error.error.error);
        });
    }
  }

  /* Cancel offering a ride */
  cancelOffering(offerRideForm) {
    this.router.navigate(['/dashboard']);
  }

  goToListRides() {
    this.router.navigate(['/listRides']);
  }

  reload() {
    location.reload();
  }
}
