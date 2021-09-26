import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationAdminComponent } from './navigation-admin.component';

describe('NavigationAdminComponent', () => {
  let component: NavigationAdminComponent;
  let fixture: ComponentFixture<NavigationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
