import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwaresListingComponent } from './hardwares-listing.component';

describe('HardwaresListingComponent', () => {
  let component: HardwaresListingComponent;
  let fixture: ComponentFixture<HardwaresListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwaresListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwaresListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
