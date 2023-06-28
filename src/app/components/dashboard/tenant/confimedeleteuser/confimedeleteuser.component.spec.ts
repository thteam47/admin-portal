import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimedeletetenantComponent } from './confimedeleteuser.component';

describe('ConfimedeletetenantComponent', () => {
  let component: ConfimedeletetenantComponent;
  let fixture: ComponentFixture<ConfimedeletetenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfimedeletetenantComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimedeletetenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
