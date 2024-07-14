import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginReactiveComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form);
  }
}
