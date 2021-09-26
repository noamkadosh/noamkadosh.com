import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineAdminComponent } from './timeline-admin.component';

describe('TimelineAdminComponent', () => {
  let component: TimelineAdminComponent;
  let fixture: ComponentFixture<TimelineAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
