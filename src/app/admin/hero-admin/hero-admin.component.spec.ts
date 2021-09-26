import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAdminComponent } from './hero-admin.component';

describe('HeroAdminComponent', () => {
  let component: HeroAdminComponent;
  let fixture: ComponentFixture<HeroAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
