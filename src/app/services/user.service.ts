import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly UsersStorageKey = 'users';

  private users: User[] = [];

  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  private currentUser!: User | null;

  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  users$: Observable<User[]> = this.userSubject.asObservable();
  currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  fetchDataFromLocalStorage() {
    // this.localStorageService.setObject('currentUser', {});
    this.users =
      this.localStorageService.getValue<User[]>(UserService.UsersStorageKey) ||
      [];
    this.currentUser =
      this.localStorageService.getValue<User | null>('currentUser') || null;
    this.updateData();
  }

  updateToLocalStorage() {
    this.localStorageService.setObject(UserService.UsersStorageKey, this.users);
    this.localStorageService.setObject('currentUser', this.currentUser);
    this.updateData();
  }

  addUser(user: User): boolean {
    const isHasUser = this.users.find((u) => u.userName === user.userName);

    if (isHasUser) {
      alert('Username is exiting!');
      return false;
    }

    // const newUser = user;
    // newUser.id = new Date(Date.now()).getTime();
    const newUser = { ...user, id: new Date().getTime() };

    this.users.unshift(newUser);
    this.updateToLocalStorage();
    alert('Add new user successfully');
    return true;
  }

  deleteUser(id: number | undefined) {
    const idx = this.users.findIndex((u) => u.id === id);
    this.users.splice(idx, 1);
    this.updateToLocalStorage();
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find((u) => u.id === id));
  }

  updateUser(user: User) {
    const idx = this.users.findIndex((u) => u.id === user.id);
    this.users.splice(idx, 1, user);
    this.updateToLocalStorage();
  }

  login(userName: string, password: string) {
    const user = this.users.find((u) => u.userName === userName);
    if (!user) {
      alert('User not found!');
      return;
    }
    if (user.password !== password) {
      alert('Incorrect password!');
      return;
    }
    this.currentUser = user;
    this.updateToLocalStorage();
    this.router.navigate(['/home']);
  }

  logout() {
    this.localStorageService.removeItem('currentUser');
    this.currentUser = null;
    this.currentUserSubject.next(null);
    this.router.navigate(['account/login']);
  }

  private updateData() {
    this.userSubject.next(this.users);
    this.currentUserSubject.next(this.currentUser);
  }
}
