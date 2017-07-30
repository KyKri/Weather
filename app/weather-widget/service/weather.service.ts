import { Injectable } from '@angular/core';
import { FORECAST_KEY, FORECAST_ROOT, GEO_KEY, GEO_ROOT } from '../constants/constants';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class WeatherService {

    constructor(private jsonp: Jsonp, private http: Http) {

    }

    getCurrentLocation(): Observable<any> {
        if (navigator.geolocation) {
            return Observable.create(observer => {
                navigator.geolocation.getCurrentPosition(pos => {
                    observer.next(pos);
                }),
                    err => {
                        return Observable.throw(err);
                    }
            });
        } else {
            return Observable.throw("Geolocation is not available");
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long;
        const queryParams = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParams)
            .map(data => data.json())
            .catch(err => {
                console.error("Unable to get weather data - ", err);
                return Observable.throw(err.json());
            });
    }

    getLocationName(lat: number, long: number): Observable<any> {
        const url = GEO_ROOT;
        const queryParams = "?latlng=" + lat + "," + long + "&key=" + GEO_KEY;

        return this.http.get(url + queryParams)
            .map(loc => loc.json())
            .catch(err => {
                console.error("Unable to get location - " + err);
                return Observable.throw(err);
            });
    }
}