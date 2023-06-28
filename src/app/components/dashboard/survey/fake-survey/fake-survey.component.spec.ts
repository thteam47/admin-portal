import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeSurveyComponent } from './fake-survey.component';

describe('FakeSurveyComponent', () => {
  let component: FakeSurveyComponent;
  let fixture: ComponentFixture<FakeSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
