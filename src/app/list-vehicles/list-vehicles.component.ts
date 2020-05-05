import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';

import { AppConstants } from '../utils/appConstants';
import { VehicleDetailsResponse } from '../interfaces/getvehicleresponse.interface';
import { DeleteVehicleResponse } from '../interfaces/deletevehicleresponse.interface';
import { VechileDetailsEnteredResponse } from '../interfaces/createvehicledetails.interface';
import { ListVehiclesService } from './list-vehicles.service';
import { VehicleService } from '../commonServices/vehicle.service';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
})
export class ListVehiclesComponent implements OnInit {

  @ViewChild('deleteVehicleModal') deleteVehicleModal: ElementRef;

  private vehicles: Array<Object> = [{}];
  private vehicleDetailsForm: FormGroup;
  private appConstants = AppConstants;
  private equalToFive = false;
  private deleteVehicleId: string;
  private hideModalButton = true;

  constructor(private listVehiclesService: ListVehiclesService, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.getVehiclesOfUser();
    this.createVehicleFormControl();
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

  /* Function that passes the details of a new vehicle of logged in user  */
  onVehicleDetailsSubmit(vehicleDetailsForm: NgForm): void {
    this.vehicleService.saveVehicleDetails(vehicleDetailsForm.value)
      .subscribe(
      (response: VechileDetailsEnteredResponse) => {
        if (response.success) {
          this.vehicleDetailsForm.reset();
          this.getVehiclesOfUser();
          alert(response.message);
        }
      },
      (error) => {
        alert(error.error.error);
      });
  }

  /* Function to get the details of vehicles of logged in user */
  getVehiclesOfUser(): void {
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

  passVehicleId(id) {
    this.deleteVehicleId = id;
    this.deleteVehicleModal.nativeElement.click();
  }

  /* Cancel vehicle of the user */
  deleteVehicle() {
    this.listVehiclesService.deleteVehicle(this.deleteVehicleId)
      .subscribe(
      (response: DeleteVehicleResponse) => {
        if (response.success) {
          alert(response.message);
          this.getVehiclesOfUser();
        }
      },
      (error) => {
        alert(error.statusText);
      });
  }
}
