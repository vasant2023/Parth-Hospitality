import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminatesCategoryComponent } from './laminates-category.component';

describe('LaminatesCategoryComponent', () => {
  let component: LaminatesCategoryComponent;
  let fixture: ComponentFixture<LaminatesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminatesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaminatesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
