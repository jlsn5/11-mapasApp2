import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];

  get isUserLocationReady(): boolean{
    return !!this.useLocation;
  }

  constructor( private http: HttpClient ) {
    this.getUserLocation();
   }

  getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [ coords.longitude, coords.latitude ];
          resolve( this.useLocation )
        },
        (err) => {
          alert('No geolocation');
          reject();
        }
      );

    })

  }

  getPlacesByQuery( query: String = '' ){

    this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=es&proximity=ip&types=place,postcode,address&language=es&access_token=pk.eyJ1IjoiaW1hZ2l2ZTk5IiwiYSI6ImNsMWpnNWZ6cTEzYmgzbHF1cWNkcjM4M2gifQ.cbSRQMVFY1h3BOmyKWoB3A`)
      .subscribe (console.log)

  }

}
