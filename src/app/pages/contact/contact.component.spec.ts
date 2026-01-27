import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.contactForm.get('name')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('message')?.value).toBe('');
  });

  it('should have submitted as false initially', () => {
    expect(component.submitted).toBeFalse();
  });

  describe('form validation', () => {
    it('should be invalid when empty', () => {
      expect(component.contactForm.valid).toBeFalse();
    });

    it('should require name', () => {
      const name = component.contactForm.get('name');
      expect(name?.errors?.['required']).toBeTruthy();
    });

    it('should require name to be at least 2 characters', () => {
      component.contactForm.get('name')?.setValue('A');
      expect(component.contactForm.get('name')?.errors?.['minlength']).toBeTruthy();

      component.contactForm.get('name')?.setValue('Ab');
      expect(component.contactForm.get('name')?.errors?.['minlength']).toBeFalsy();
    });

    it('should require email', () => {
      const email = component.contactForm.get('email');
      expect(email?.errors?.['required']).toBeTruthy();
    });

    it('should require a valid email format', () => {
      component.contactForm.get('email')?.setValue('invalid');
      expect(component.contactForm.get('email')?.errors?.['email']).toBeTruthy();

      component.contactForm.get('email')?.setValue('valid@example.com');
      expect(component.contactForm.get('email')?.errors).toBeNull();
    });

    it('should require message', () => {
      const message = component.contactForm.get('message');
      expect(message?.errors?.['required']).toBeTruthy();
    });

    it('should require message to be at least 10 characters', () => {
      component.contactForm.get('message')?.setValue('Short');
      expect(component.contactForm.get('message')?.errors?.['minlength']).toBeTruthy();

      component.contactForm.get('message')?.setValue('Long enough message');
      expect(component.contactForm.get('message')?.errors?.['minlength']).toBeFalsy();
    });

    it('should be valid when all fields are correctly filled', () => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message',
      });
      expect(component.contactForm.valid).toBeTrue();
    });
  });

  describe('f getter', () => {
    it('should return form controls', () => {
      expect(component.f['name']).toBe(component.contactForm.controls['name']);
      expect(component.f['email']).toBe(component.contactForm.controls['email']);
      expect(component.f['message']).toBe(component.contactForm.controls['message']);
    });
  });

  describe('onSubmit', () => {
    it('should set submitted to true', () => {
      component.onSubmit();
      expect(component.submitted).toBeTrue();
    });

    it('should not reset the form when invalid', () => {
      component.onSubmit();
      expect(component.submitted).toBeTrue();
      expect(component.contactForm.value).toEqual({
        name: '',
        email: '',
        message: '',
      });
    });

    it('should reset the form and submitted flag when valid', () => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message',
      });

      component.onSubmit();

      expect(component.contactForm.value).toEqual({
        name: null,
        email: null,
        message: null,
      });
      expect(component.submitted).toBeFalse();
    });

    it('should log form value to console when valid', () => {
      spyOn(console, 'log');

      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message',
      });

      component.onSubmit();

      expect(console.log).toHaveBeenCalledWith('Form submitted:', {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message',
      });
    });

    it('should not log when form is invalid', () => {
      spyOn(console, 'log');
      component.onSubmit();
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should render the contact heading', () => {
      const heading = fixture.nativeElement.querySelector('h1');
      expect(heading.textContent).toContain('Contact');
    });

    it('should render three form fields', () => {
      const inputs = fixture.nativeElement.querySelectorAll('input');
      const textareas = fixture.nativeElement.querySelectorAll('textarea');
      expect(inputs.length).toBe(2);
      expect(textareas.length).toBe(1);
    });

    it('should show validation errors after submit with empty form', () => {
      component.onSubmit();
      fixture.detectChanges();

      const errors = fixture.nativeElement.querySelectorAll('.text-red-400');
      expect(errors.length).toBe(3);
    });

    it('should not show validation errors before submit', () => {
      const errors = fixture.nativeElement.querySelectorAll('.text-red-400');
      expect(errors.length).toBe(0);
    });
  });
});
