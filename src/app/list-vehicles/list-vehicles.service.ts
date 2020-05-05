import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { StorageService } from '../commonServices/storage.service';

import { AppConstants } from '../utils/appConstants';
import { DeleteVehicleResponse } from '../interfaces/deletevehicleresponse.interface';


@Injectable()
export class ListVehiclesService {

  constructor(private storageService: StorageService, private http: HttpClient) { }

  /* Cancel a vehicle of the user */
  deleteVehicle(vehicleId: string): Observable<DeleteVehicleResponse> {
    const user = this.storageService.getValue(AppConstants.localstorageLoginFeed);
    const headers = new HttpHeaders({
      'Content-Type': AppConstants.contentType,
      'Authorization': user.data.id,
    });
    const body = [];
    const deleteBody = {
      id: vehicleId
    };
    body.push(deleteBody);
    return this.http.request('delete', AppConstants.cancelVehicleUrl, { body: body, headers: headers })
      .map(
      (response: DeleteVehicleResponse) => {
        return response;
      },
      (error) => {
        return error;
      }
      );
  }
}
