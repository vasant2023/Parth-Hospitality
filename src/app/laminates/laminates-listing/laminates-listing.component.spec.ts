import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminatesListingComponent } from './laminates-listing.component';

describe('LaminatesListingComponent', () => {
  let component: LaminatesListingComponent;
  let fixture: ComponentFixture<LaminatesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminatesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaminatesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
