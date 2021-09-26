import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsItemAdminComponent } from './skills-item-admin.component';

describe('SkillsItemAdminComponent', () => {
  let component: SkillsItemAdminComponent;
  let fixture: ComponentFixture<SkillsItemAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsItemAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsItemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
