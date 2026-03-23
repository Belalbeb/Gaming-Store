import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRequiredDialog } from './login-required-dialog';

describe('LoginRequiredDialog', () => {
  let component: LoginRequiredDialog;
  let fixture: ComponentFixture<LoginRequiredDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRequiredDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRequiredDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
