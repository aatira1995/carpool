import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RoutingModule } from './routing/routing.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { HttpModule } from '@angular/http';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { BookRidesComponent } from './book-rides/book-rides.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorsComponent } from './errors/errors.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { ListRidesComponent } from './list-rides/list-rides.component';
import { ListVehiclesComponent } from './list-vehicles/list-vehicles.component';

import { AppConstants } from './utils/appConstants';
import { BookrideService } from './book-rides/bookride.service';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { LogoutService } from './commonServices/logout.service';
import { MapService } from './commonServices/map.service';
import { ProfileService } from './account/profile.service';
import { UpdateService } from './update-profile/update.service';
import { OfferRideService } from './offer-ride/offer-ride.service';
import { StorageService } from './commonServices/storage.service';
import { ListRidesService } from './list-rides/list-rides.service';
import { ListVehiclesService } from './list-vehicles/list-vehicles.service';
import { VehicleService } from './commonServices/vehicle.service';
import { EditService } from './commonServices/edit.service';

@NgModule({
  declarations: [
    AppComponent,
    BookRidesComponent,
    LoginComponent,
    RegisterComponent,
    ErrorsComponent,
    DashboardComponent,
    HeaderComponent,
    AccountComponent,
    UpdateProfileComponent,
    OfferRideComponent,
    ListRidesComponent,
    ListVehiclesComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    GooglePlaceModule,
    ShowHidePasswordModule.forRoot(),
    AngularFontAwesomeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
  ],
  providers: [
    BookRidesComponent,
    BookrideService,
    FormBuilder,
    RegisterService,
    HttpClientModule,
    MapService,
    ProfileService,
    UpdateService,
    LoginService,
    LogoutService,
    OfferRideService,
    StorageService,
    ListRidesService,
    ListVehiclesService,
    VehicleService,
    DatePipe,
    EditService,
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
