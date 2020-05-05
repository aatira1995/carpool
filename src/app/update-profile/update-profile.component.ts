import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorsComponent } from '../errors/errors.component';

import { UpdateService } from '../update-profile/update.service';

import { AppConstants } from '../utils/appConstants';
import { ProfileResponse } from '../interfaces/account.interface';
import { UpdateProfileResponse } from '../interfaces/updateProfile.interface';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  private updateForm: FormGroup;
  private changePasswordForm: FormGroup;
  private appConstants = AppConstants;

  constructor(private updateService: UpdateService, private router: Router) { }

  profileFetched = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  ngOnInit() {
    this.createUpdateFormControl();
    this.createChangePasswordControl();
    this.getUserDetails();
  }

  /* Gets form  build for updation of profile details of logged in user */
  createUpdateFormControl(): void {
    this.updateService.createUpdateFormControl()
      .subscribe(
      (form: FormGroup) => {
        this.updateForm = form;
      }
      );
  }

  /* Gets form  build for changing password of logged in user  */
  createChangePasswordControl(): void {
    this.updateService.createChangePasswordControl()
      .subscribe(
      (form: FormGroup) => {
        this.changePasswordForm = form;
      }
      );
  }

  /* Get profile details of logged in user to populate in the form */
  getUserDetails(): void {
    this.updateService.getProfileDetails()
      .subscribe(
      (profileDetails: ProfileResponse) => {
        this.profileFetched = profileDetails['data'];
      }
      );
  }

  /* Pass the details in the  form based on condition provided (password exist or not) */
  onProfileUpdate(profileUpdateForm: NgForm): void {
    this.updateService.updateUserDetails(profileUpdateForm.value)
      .subscribe(
      (response: UpdateProfileResponse) => {
        alert(response.message);
      },
      (error) => {
        alert(error.error.error);
      });
  }

  /* Change Password of logged in user */
  changePassword(changePasswordForm: NgForm): void {
    if (changePasswordForm.value.password !== '' && changePasswordForm.value.newPassword !== '') {
      this.updateService.changePassword(changePasswordForm.value)
        .subscribe(
        (response: UpdateProfileResponse) => {
          alert(response.message);
          this.changePasswordForm.reset();
        },
        (error) => {
          alert(error.error.error);
          this.changePasswordForm.reset();
        });
    }
  }

  /* Cancel  the changes of update form */
  cancelUpdation(updateForm) {
    this.updateForm.reset();
    this.router.navigate(['/account']);
  }
}
