import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../utils/appConstants';

import { EditService } from '../commonServices/edit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private appConstants = AppConstants;

  constructor(private router: Router, private editService: EditService) { }

  ngOnInit() {
  }
  gotoOfferRIdes() {
    this.editService.clearRideId();
    this.router.navigate(['/offerRide']);
  }
  gotoBookRIdes() {
    this.router.navigate(['/bookRide']);
  }
}
