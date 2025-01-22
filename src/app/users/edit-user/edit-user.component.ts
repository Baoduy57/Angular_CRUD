import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { passwordMatchValidator } from '../add-user/password-match.validator';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  user!: User | undefined;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params?.['id']);
    this.userService.getUserById(id).subscribe((user) => (this.user = user));
    this.editForm = this.fb.group(
      {
        firstName: [this.user?.firstName, Validators.required],
        lastName: [this.user?.lastName, Validators.required],
        userName: [this.user?.email, Validators.required],
        password: [
          this.user?.password,
          Validators.compose([Validators.minLength(6)]),
        ],
        confirmPassword: [''],
      },
      { validators: passwordMatchValidator() } // Áp dụng custom validator
    );
  }

  onSubmit() {
    const isUpdate = confirm('Do you want to update this user?');
    if (isUpdate) {
      const value = this.editForm.value;
      const newUser: User = {
        id: this.user?.id,
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password === '' ? this.user?.password : value.password,
      };
      this.userService.updateUser(newUser);
      alert('Update user successfully');
    }
  }
}
