import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimedeletecombinedComponent } from './confimedeleteuser.component';

describe('ConfimedeletecombinedComponent', () => {
  let component: ConfimedeletecombinedComponent;
  let fixture: ComponentFixture<ConfimedeletecombinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfimedeletecombinedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimedeletecombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
