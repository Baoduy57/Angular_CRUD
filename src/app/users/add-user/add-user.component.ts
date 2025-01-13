import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.addForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator() } // Áp dụng custom validator
    );
  }

  // onSubimt() {
  //   const value = this.addForm.value;
  //   if (value.password !== value.confirmPassword) {
  //     alert('Password is not same!');
  //     return;
  //   }
  //   const newUSer: User = {
  //     firstName: value.firstName,
  //     lastName: value.lastName,
  //     userName: value.userName,
  //     password: value.password,
  //   };
  //   this.userService.addUser(newUSer);
  //   this.addForm.reset();
  //   alert('Add new user successfully');
  // }

  onSubimt() {
    const value = this.addForm.value;
    const newUser: User = {
      firstName: value.firstName,
      lastName: value.lastName,
      userName: value.userName,
      password: value.password,
    };

    this.userService.addUser(newUser);
    this.addForm.reset();
    alert('Add new user successfully');
  }
}
