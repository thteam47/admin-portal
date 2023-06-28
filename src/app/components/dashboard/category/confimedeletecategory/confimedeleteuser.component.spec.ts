import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimedeletecategoryComponent } from './confimedeleteuser.component';

describe('ConfimedeletecategoryComponent', () => {
  let component: ConfimedeletecategoryComponent;
  let fixture: ComponentFixture<ConfimedeletecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfimedeletecategoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimedeletecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
