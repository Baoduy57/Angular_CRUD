import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator() }
    );
  }

  onSubmit() {
    const value = this.registerForm.value;
    const newUser: User = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
    };

    this.userService.registerUser(newUser).subscribe({
      next: (res) => {
        alert('Register new user successfully');
        this.registerForm.reset();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });

    // if (this.userService.addUser(newUser)) {
    //   this.registerForm.reset();
    // }
  }
}
