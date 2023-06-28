import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestVerifyEmailComponent } from './request-verify-email.component';

describe('RequestVerifyEmailComponent', () => {
  let component: RequestVerifyEmailComponent;
  let fixture: ComponentFixture<RequestVerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestVerifyEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
