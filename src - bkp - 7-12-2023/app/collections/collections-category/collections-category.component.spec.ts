import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsCategoryComponent } from './collections-category.component';

describe('CollectionsCategoryComponent', () => {
  let component: CollectionsCategoryComponent;
  let fixture: ComponentFixture<CollectionsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
