import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with a button and these inputs: lastname, firstname, email, password, confirm-password', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#lastname')).toBeTruthy();
    expect(element.querySelector('#firstname')).toBeTruthy();
    expect(element.querySelector('#email')).toBeTruthy();
    expect(element.querySelector('#password')).toBeTruthy();
    expect(element.querySelector('#confirm_password')).toBeTruthy();
    expect(element.querySelector('button')).toBeTruthy();
  });

  it('should return model invalid when form is empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate lastname input as required', () => {
    const lastname = component.form.controls.lastname;

    expect(lastname.valid).toBeFalsy();
    expect(lastname.errors.required).toBeTruthy();
  });

  it('should validate firstname input as required', () => {
    const firstname = component.form.controls.firstname;

    expect(firstname.valid).toBeFalsy();
    expect(firstname.errors.required).toBeTruthy();
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

  it('should validate confirm_password input as required', () => {
    const confirm_password = component.form.controls.confirm_password;

    expect(confirm_password.valid).toBeFalsy();
    expect(confirm_password.errors.required).toBeTruthy();
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
});
