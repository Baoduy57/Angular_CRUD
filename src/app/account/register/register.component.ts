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
        userName: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
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
      userName: value.userName,
      password: value.password,
    };

    if (this.userService.addUser(newUser)) {
      this.registerForm.reset();
    }
  }
}
