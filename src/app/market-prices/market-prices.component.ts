import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';


import { MarketDataService } from '../market-data.service';
import { ChartData } from '../models/chart-data.model'; // Importing the ChartData interface

@Component({
  selector: 'app-market-prices',
  templateUrl: './market-prices.component.html',
  styleUrls: ['./market-prices.component.css']
})
export class MarketPricesComponent implements OnInit {

  // Filtering properties with default values
  allData: any[] = [];
  displayedData: any[] = [];
  // displayedData = new MatTableDataSource<any>([]); // Change the type of displayedData to MatTableDataSource
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  commodities: string[] = [];
  grades: string[] = [];
  sexes: string[] = [];
  markets: string[] = [];
  selectedCommodity: string | null = null;
  selectedGrade: string | null = null;
  selectedSex: string | null = null;
  selectedMarkets: string[] = [];

  displayedColumns: string[] = ['commodity', 'grade', 'sex', 'market', 'price', 'date'];

  // Chart properties with explicit typing
  chartOptions = {
    chart: {
      type: 'line',
      height: 350
    } as ApexChart,
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date'
      }
    } as ApexXAxis,
    yaxis: {
      title: {
        text: 'Price'
      }
    } as ApexYAxis,
    title: {
      text: 'Price Trends',
      align: 'left'
    } as ApexTitleSubtitle
  };



  chartSeries: ChartData[] = [
    {
      name: 'Price',
      data: []
    }
  ];

  constructor(private marketDataService: MarketDataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchMarketData();
  }

  fetchMarketData(): void {
    this.marketDataService.getMarketData().subscribe(data => {
      // Populate the allData property with the fetched data
      this.allData = data;

      // Initially, displayedData will be the same as allData
      this.displayedData = [...this.allData];

      // Process the data and populate the properties for filters
      this.commodities = Array.from(new Set(data.map(item => item.commodity)));
      this.grades = Array.from(new Set(data.map(item => item.grade)));
      this.sexes = Array.from(new Set(data.map(item => item.sex)));
      this.markets = Array.from(new Set(data.map(item => item.market)));

      // Process the data for the chart
      const chartData: { x: number; y: number }[] = data.map(item => {
        return {
          x: new Date(item.date).getTime(),
          y: item.price
        };
      });

      // Assign the processed data to chartSeries
      this.chartSeries[0].data = chartData;
    });
  }


  updateDisplayData(): void {
    // Filter the allData based on the selected filters
    this.displayedData = this.allData.filter(item =>
      (!this.selectedCommodity || item.commodity === this.selectedCommodity) &&
      (!this.selectedGrade || item.grade === this.selectedGrade) &&
      (!this.selectedSex || item.sex === this.selectedSex) &&
      (!this.selectedMarkets.length || this.selectedMarkets.includes(item.market))
    );

    // Update chart data based on the filtered displayedData
    this.chartSeries[0].data = this.displayedData.map(item => ({
      x: new Date(item.date).getTime(),
      y: item.price
    }));

    // If you're using ChangeDetectorRef, trigger change detection
    this.cdr.detectChanges();
  }



}
