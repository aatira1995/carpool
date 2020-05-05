import { Injectable } from '@angular/core';
import { LoginResponse } from '../interfaces/loginresponse.interface';

@Injectable()
export class StorageService {

  constructor() { }
  setValue(key: string, value: LoginResponse) {
    /**
     * Set a value to local storage
     * @param { string } key
     * @param { LoginResponse } value
    */
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue(key: string) {
    /**
     * Get a value from local storage
     * @param { string } key
     * @returns { any }
    */
    if (localStorage.getItem(key) !== null && localStorage.getItem(key) !== 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return '';
    }
  }

  removeValue(key) {
    /**
     * Remove a value from local storage
    */
    localStorage.removeItem(key);
  }

  setRideId(key, rideId) {
    /**
     * store ride id into localstorage
     * @param { string } key
     * @param { rideId } string
     */
    localStorage.setItem(key, rideId);
  }
}
