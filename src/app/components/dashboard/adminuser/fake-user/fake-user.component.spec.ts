import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeUserComponent } from './fake-user.component';

describe('FakeUserComponent', () => {
  let component: FakeUserComponent;
  let fixture: ComponentFixture<FakeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
