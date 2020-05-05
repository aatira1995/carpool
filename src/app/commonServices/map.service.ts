import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { DistanceMatrixResponse } from '../interfaces/distanceMatrixResponse';

declare const google: any;
const directionsDisplay = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();

@Injectable()
export class MapService {

  constructor(private http: Http) { }

  getData(request): Observable<object> {
    // tslint:disable-next-line:max-line-length
    const distanceUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + request.source + '&destinations=' + request.destination + '&key=AIzaSyAsNDH1Et-uqDHCt1_ZJi-DKB5f80Tt-yA';
    return this.http.get(distanceUrl)
      .map(res => res.json()
      , error => {
        return error;
      });
  }
}
