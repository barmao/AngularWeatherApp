import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MarketData {
  commodity: string;
  grade: string;
  sex: string;
  market: string;
  price: number;
  date: string;
  // Add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  private apiUrl = 'http://localhost:3000/market'; // Adjust if your json-server is on a different port

  constructor(private http: HttpClient) {}

  getMarketData(): Observable<MarketData[]> {
    return this.http.get<MarketData[]>(this.apiUrl);
  }
}
