import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // userss = [
  //   {
  //     id: 1,
  //     firstName: 'Duy',
  //     lastName: 'Thai',
  //     userName: 'thauduy',
  //     password: '1234',
  //   },
  //   {
  //     id: 2,
  //     firstName: 'Duy',
  //     lastName: 'Thai',
  //     userName: 'thauduy',
  //     password: '1234',
  //   },
  //   {
  //     id: 3,
  //     firstName: 'Duy',
  //     lastName: 'Thai',
  //     userName: 'thauduy',
  //     password: '1234',
  //   },
  //   {
  //     id: 4,
  //     firstName: 'Duy',
  //     lastName: 'Thai',
  //     userName: 'thauduy',
  //     password: '1234',
  //   },
  // ];

  users: User[] = [];

  constructor(private userServive: UserService) {
    // this.route.
  }
  // ngAfterViewInit(): void {
  //   console.log(2);
  // }
  // ngOnDestroy(): void {
  //   console.log(3);
  // }

  ngOnInit(): void {
    this.userServive.users$.subscribe((users) => (this.users = users));
  }

  addUser() {
    const newUser: User = {
      firstName: 'New123',
      lastName: 'User123',
      userName: 'newuser123',
      password: '123456789',
    };
    this.userServive.addUser(newUser);
  }
}
