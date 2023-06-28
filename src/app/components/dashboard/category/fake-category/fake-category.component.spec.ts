import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeCategoryComponent } from './fake-category.component';

describe('FakeCategoryComponent', () => {
  let component: FakeCategoryComponent;
  let fixture: ComponentFixture<FakeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
