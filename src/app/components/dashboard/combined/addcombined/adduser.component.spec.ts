import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCombinedComponent } from './adduser.component';

describe('AddCombinedComponent', () => {
  let component: AddCombinedComponent;
  let fixture: ComponentFixture<AddCombinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCombinedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
