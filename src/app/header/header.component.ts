import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogoutService } from '../commonServices/logout.service';
import { AppConstants } from '../utils/appConstants';
import { LogoutResponse } from '../interfaces/logoutresponse.interface';
import { StorageService } from '../commonServices/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private logoutService: LogoutService, private router: Router, private storageService: StorageService) { }

  private staticPageContent = AppConstants;
  private logoutResponse: LogoutResponse;
  private loginData = this.storageService.getValue(AppConstants.localstorageLoginFeed);

  ngOnInit() {
    const user = this.storageService.getValue('LoginFeed');
    if (!user) {
      this.router.navigate(['/login']);
    }
  }
  /**
    calling logout service and remove loginreponse from localstorage
    *
    *@returns { void }
  */

  logout() {
    this.logoutService.logOut()
      .subscribe(
      (response: LogoutResponse) => {
        if (response.success) {
          this.storageService.removeValue(AppConstants.localstorageLoginFeed);
          this.router.navigate(['/login']);
        }
      },
      err => {
        alert(err.error.error);
      });
  }
}
