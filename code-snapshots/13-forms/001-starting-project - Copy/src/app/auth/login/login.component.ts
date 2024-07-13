import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  protected email = '';
  protected password = '';
  @ViewChild('form') private readonly form: NgForm | undefined;
  private readonly subscriptions = new Array<Subscription>();

  constructor() {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeFormFromStorage();
    }, 1);
    this.subscriptions.push(
      this.form!.valueChanges!.pipe(debounceTime(500)).subscribe({
        next: (values) => {
          localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: values.email })
          );
        },
      })
    );
  }

  initializeFormFromStorage() {
    const storedFormData = JSON.parse(
      localStorage.getItem('saved-login-form') ?? ''
    );
    if (storedFormData)
      this.form!.setValue({
        email: storedFormData.email,
        password: '',
      });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) return;
    formData.form.reset();
  }
}
