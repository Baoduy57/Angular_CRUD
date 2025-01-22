import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private userServive: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  onSubmit() {
    const value = this.loginForm.value;
    // this.userServive.login(value.userName, value.password);
    this.userServive.login2(value.email, value.password).subscribe({
      next: (res) => {
        this.userServive.setCurrentUser(res.user);
        this.userServive.updateToLocalStorage();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(123);
        alert(err.error.message);
      },
    });
  }
}
