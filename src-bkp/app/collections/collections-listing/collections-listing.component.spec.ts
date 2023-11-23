import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsListingComponent } from './collections-listing.component';

describe('CollectionsListingComponent', () => {
  let component: CollectionsListingComponent;
  let fixture: ComponentFixture<CollectionsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
