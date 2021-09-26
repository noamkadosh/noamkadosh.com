import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaAdminComponent } from './social-media-admin.component';

describe('SocialMediaAdminComponent', () => {
  let component: SocialMediaAdminComponent;
  let fixture: ComponentFixture<SocialMediaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
