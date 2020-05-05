import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '../register/register.component';
import { AccountComponent } from '../account/account.component';
import { BookRidesComponent } from '../book-rides/book-rides.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { OfferRideComponent } from '../offer-ride/offer-ride.component';
import { ListRidesComponent } from '../list-rides/list-rides.component';
import { ListVehiclesComponent } from '../list-vehicles/list-vehicles.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HeaderComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'account', component: AccountComponent },
      { path: 'updateProfile', component: UpdateProfileComponent },
      { path: 'offerRide', component: OfferRideComponent },
      { path: 'editRide', component: OfferRideComponent },
      { path: 'bookRide', component: BookRidesComponent },
      { path: 'listRides', component: ListRidesComponent },
      { path: 'listRides', component: ListRidesComponent },
      { path: 'listVehicles', component: ListVehiclesComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})

export class RoutingModule { }
