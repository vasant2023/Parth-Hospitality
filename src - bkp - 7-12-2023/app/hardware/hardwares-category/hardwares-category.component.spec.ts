import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwaresCategoryComponent } from './hardwares-category.component';

describe('HardwaresCategoryComponent', () => {
  let component: HardwaresCategoryComponent;
  let fixture: ComponentFixture<HardwaresCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwaresCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwaresCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
