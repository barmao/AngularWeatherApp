import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-market-price-column-chart',
  templateUrl: './market-price-column-chart.component.html',
  styleUrls: ['./market-price-column-chart.component.css']
})
export class MarketPriceColumnChartComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() selectedMarkets: string[] = [];


  chartOptions: any;
  chartSeries: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedMarkets']) {
        this.updateChartData();
    }
}


  updateChartData() {
    console.log("Here");
    const seriesData = this.selectedMarkets.map(market => {
      return {
        name: market,
        data: this.data.filter(item => item.market === market).map(item => item.price)
      };
    });

    this.chartSeries = seriesData;

    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      xaxis: {
        categories: this.selectedMarkets
      },
      title: {
        text: 'Market Prices Comparison'
      }
    };
  }
}
