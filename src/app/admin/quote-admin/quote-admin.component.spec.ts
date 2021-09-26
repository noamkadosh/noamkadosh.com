import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteAdminComponent } from './quote-admin.component';

describe('QuoteAdminComponent', () => {
  let component: QuoteAdminComponent;
  let fixture: ComponentFixture<QuoteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
