import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { AppConstants } from '../utils/appConstants';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
})

export class ErrorsComponent implements OnInit {

  private staticContent = AppConstants.errorMessage;

  errorMessages = {
    vehicleNumber: this.staticContent.vehicleNumberError,
    vehicleName: this.staticContent.vehicleNameError,
    seatsAvailable: this.staticContent.seatsAvailableError,
    vehicleId: this.staticContent.vehicleIdError,
    fromLocation: this.staticContent.fromLocationError,
    toLocation: this.staticContent.toLocationError,
    checkpoints: this.staticContent.checkpointsError,
    cost: this.staticContent.costError,
    name: this.staticContent.nameError,
    email: this.staticContent.emailError,
    phone: this.staticContent.phoneError,
    password: this.staticContent.passwordError,
    address: this.staticContent.addressError,
    origin: this.staticContent.originError,
    destination: this.staticContent.destinationError,
    radius: this.staticContent.radiusError,
    newPassword: this.staticContent.newPasswordError
  };

  error = '';

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  constructor() { }

  ngOnInit() { }

  /* The condition to show the error */
  shouldShowErrors(): boolean {
    return this.control && this.control.errors && (this.control.dirty || this.control.touched);
  }

  /* The list of errors for that particular control */
  listOfErrors(): string {
    if (Object.keys(this.control.errors)) {
      this.error = this.getMessage(this.control);
    }
    return this.error;
  }

  /* Return the message to be displayed when an error is found in that particular control */
  getMessage(control: any) {
    const controlName = this.getControlName(control);
    const msg = this.errorMessages[controlName];
    return msg;
  }

  /* Function that return the control of a particular field in the FormGroup */
  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name] || null);
  }
}
