import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: StoreService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getErrorMessage(element: string) {
    return this.form.controls[element].hasError('required') ? `You must enter a ${element} value` : '';
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      let user = this.form.value;
      if (this.form.value.username === 'admin' && this.form.value.password === 'admin@123') {
        user.role = 'admin';
        this.router.navigate(['/auth/admin']);
      }
      else {
        user.role = 'user';
        this.router.navigate(['/']);
      }
      this.store.setState(user);

    }
  }
}
