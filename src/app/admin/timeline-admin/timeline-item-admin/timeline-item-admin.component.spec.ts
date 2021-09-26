import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineItemAdminComponent } from './timeline-item-admin.component';

describe('TimelineItemAdminComponent', () => {
  let component: TimelineItemAdminComponent;
  let fixture: ComponentFixture<TimelineItemAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineItemAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineItemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
