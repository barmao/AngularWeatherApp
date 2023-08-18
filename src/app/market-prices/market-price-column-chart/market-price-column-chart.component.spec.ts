import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPriceColumnChartComponent } from './market-price-column-chart.component';

describe('MarketPriceColumnChartComponent', () => {
  let component: MarketPriceColumnChartComponent;
  let fixture: ComponentFixture<MarketPriceColumnChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketPriceColumnChartComponent]
    });
    fixture = TestBed.createComponent(MarketPriceColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
