import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../account/profile.service';
import { AppConstants } from '../utils/appConstants';
import { ProfileResponse } from '../interfaces/account.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  appConstants = AppConstants;

  constructor(private profileService: ProfileService) { }
  profileFetched = {
    name: '',
    email: '',
    phone: '',
  };

  ngOnInit() {
    this.getUserDetails();
  }

  /* Function to fetch details of logged in user */
  getUserDetails(): void {
    this.profileService.getProfileDetails()
      .subscribe(
      (profileDetails: ProfileResponse) => {
        this.profileFetched = profileDetails['data'];
      }
      );
  }
}
