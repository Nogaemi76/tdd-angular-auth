import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '../_services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'authService',
    ['login']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with a button and these inputs: email, password', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#email')).toBeTruthy();
    expect(element.querySelector('#password')).toBeTruthy();
    expect(element.querySelector('button')).toBeTruthy();
  });

  it('should return model invalid when form is empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate email input as required', () => {
    const email = component.form.controls.email;

    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
  });

  it('should validate password input as required', () => {
    const password = component.form.controls.password;

    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });


  it('should not validate email format when it is not correct', () => {
    const email = component.form.controls.email;
    email.setValue('test');
    const errors = email.errors;

    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeTruthy();
    expect(email.valid).toBeFalsy();

  });

  it('should validate email format when it is correct', () => {
    const email = component.form.controls.email;
    email.setValue('test@test.com');
    const errors = email.errors || {};

    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeFalsy();
    expect(email.valid).toBeTruthy();
  });

  it('should render an email error message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#email-error')).toBeFalsy();

    elements.querySelector('button').click();
    fixture.detectChanges();

    expect(elements.querySelector('#email-error')).toBeTruthy();
    expect(elements.querySelector('#email-error').textContent).toContain('Veuillez entrer un email valide.');
  });

  it('should render a password error message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#password-error')).toBeFalsy();

    elements.querySelector('button').click();
    fixture.detectChanges();

    expect(elements.querySelector('#password-error')).toBeTruthy();
    expect(elements.querySelector('#password-error').textContent).toContain('Veuillez entrer un mot de passe valide.');
  });

  it('should invoke auth service when form is valid', () => {
    const email = component.form.controls.email;
    email.setValue('test@test.com');
    const password = component.form.controls.password;
    password.setValue('123456');
    authServiceStub.login.and.returnValue(of());

    fixture.nativeElement.querySelector('button').click();

    expect(authServiceStub.login.calls.any()).toBeTruthy();

    // Test to ckeck
    expect(authServiceStub.login).toHaveBeenCalledWith(
      email.value,
      password.value
    );
  });

});
