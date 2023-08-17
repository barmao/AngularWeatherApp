import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'http://localhost:3000/weather';

  constructor(private http: HttpClient) { }

  getWeatherByRegion(region: string){
    return this.http.get<any>(`${this.baseUrl}?region=${region}`);
  }
}
