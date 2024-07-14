import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, Observable, Subscription } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) return null;
  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(
  control: AbstractControl
): Observable<{ [key: string]: any } | null> {
  return new Observable((sub) => {
    setTimeout(() => {
      if (control.value.includes('jason@gmail.com')) {
        sub.next({ emailNotUnique: true });
      } else {
        sub.next(null);
      }

      sub.complete();
    }, 1000);
  });
}

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginReactiveComponent implements OnInit, OnDestroy {
  subscriptions = new Array<Subscription>();
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  ngOnInit(): void {
    const savedForm = localStorage.getItem('saved-login-form');
    if (savedForm) {
      const { email } = JSON.parse(savedForm);
      this.form.patchValue({
        email: email,
      });
    }

    this.subscriptions.push(
      this.form.valueChanges.pipe(debounceTime(500)).subscribe((values) => {
        localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: values.email })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => void s.unsubscribe());
  }

  get isEmailInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get isPasswordInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onSubmit() {
    console.log(this.form);
  }
}
