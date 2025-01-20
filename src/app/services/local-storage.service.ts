import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage!: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getValue<T>(key: string): T | null | undefined {
    console.log(1);

    const data = this.storage[key] || null;
    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  setObject(key: string, value: any): void {
    if (!value) {
      return;
    }
    this.storage[key] = JSON.stringify(value);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }
}
