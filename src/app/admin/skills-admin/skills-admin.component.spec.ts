import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAdminComponent } from './skills-admin.component';

describe('SkillsAdminComponent', () => {
  let component: SkillsAdminComponent;
  let fixture: ComponentFixture<SkillsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
