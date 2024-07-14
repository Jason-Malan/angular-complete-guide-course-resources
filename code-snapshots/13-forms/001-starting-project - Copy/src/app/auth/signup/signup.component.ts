import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalValues(...controlNames: string[]) {
  return (control: AbstractControl) => {
    const keys = Object.keys(control.value).filter((key) =>
      controlNames.includes(key)
    );

    let values: string[] = [];
    keys.forEach((key) => {
      values.push(control.value[key]);
    });

    let isEqual = true;
    for (let index = 0; index < values.length; index++) {
      const element1 = values[index];
      for (let index = 0; index < values.length; index++) {
        const element2 = values[index];
        if (isEqual) {
          isEqual = element1 === element2;
        }
      }
    }

    console.log(isEqual);

    if (isEqual) return null;
    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: [equalValues('password', 'confirmPassword')] }
    ),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.form.invalid) this.markAll(this.form);
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }

  markAll(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormControl) {
        control.markAsDirty();
        control.markAsTouched();
      } else this.markAll(control as FormGroup);
    });
  }
}
