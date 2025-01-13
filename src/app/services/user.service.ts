import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly UsersStorageKey = 'users';

  private users: User[] = [];

  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  users$: Observable<User[]> = this.userSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  fetchDataFromLocalStorage() {
    this.users =
      this.localStorageService.getValue<User[]>(UserService.UsersStorageKey) ||
      [];
    this.updateData();
  }

  updateToLocalStorage() {
    this.localStorageService.setObject(UserService.UsersStorageKey, this.users);
    this.updateData();
  }

  addUser(user: User): void {
    const isHasUser = this.users.find((u) => u.userName === user.userName);

    if (isHasUser) {
      alert('Username is exiting!');
      return;
    }

    // const newUser = user;
    // newUser.id = new Date(Date.now()).getTime();
    const newUser = { ...user, id: new Date().getTime() };

    this.users.unshift(newUser);
    this.updateToLocalStorage();
  }

  deleteUser(id: number | undefined) {
    const idx = this.users.findIndex((u) => u.id === id);
    this.users.splice(idx, 1);
    this.updateToLocalStorage();
  }

  private updateData() {
    this.userSubject.next(this.users);
  }
}
