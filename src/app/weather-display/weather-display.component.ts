import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1s ease-in', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('1s ease-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class WeatherDisplayComponent implements OnInit {

  weatherData: any;

  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    //Let's fetch the weather for Nairobi as an example
    this.weatherService.getWeatherByRegion('Nairobi').subscribe(data => {
      this.weatherData = data[0]; // Since it might return an array, we pick the first item
      this.determineWeatherPattern();
    });

  }

  isExtremeTemperature(temp: number): boolean {
    return temp > 35 || temp < 10; // Example thresholds
  }

  isExtremePrecipitation(precip: number): boolean {
    return precip > 80;
  }

  determineWeatherPattern(): void {
    this.weatherData.forecast.forEach((day: any) => {
      if (day.temperature > 24) {
        day.weatherType = 'sunny';
      } else if (day.precipitation > 10) {
        day.weatherType = 'rainy';
      } else {
        day.weatherType = 'cloudy';
      }
    });
  }


  weatherIcon(icon: string): string {
    switch (icon) {
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy';
      case 'clear-day':
        return 'wi wi-day-sunny';
      case 'partly-cloudy-night':
        return 'wi wi-night-partly-cloudy';
      default:
        return 'wi wi-day-sunny';
    }
}


}
