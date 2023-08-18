import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MarketPricesComponent } from './market-prices/market-prices.component';
import { MatTableModule } from '@angular/material/table';
import { MarketPriceColumnChartComponent } from './market-prices/market-price-column-chart/market-price-column-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherDisplayComponent,
    MarketPricesComponent,
    MarketPriceColumnChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    MatSelectModule,
    NgApexchartsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
