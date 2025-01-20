import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-crud2';
  currentUser!: Observable<User | null>;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.fetchDataFromLocalStorage();
    this.currentUser = this.userService.currentUser$;
  }

  logout() {
    this.userService.logout();
  }
}
