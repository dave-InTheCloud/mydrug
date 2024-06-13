import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface IStorageService<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}

export class StorageService<T> implements IStorageService<T> {
  private readonly prefix: string;
  private readonly sync: boolean;

  constructor(prefix: string = '', sync: boolean = false) {
    this.prefix = prefix;
    this.sync = sync;
  }

  async get(key: string): Promise<T | null> {
    const item = await AsyncStorage.getItem(this.prefix + key);
    if (!item) return null;
    return JSON.parse(item) as T;
  }

  async set(key: string, value: T): Promise<void> {
    if (!this.sync) {
      AsyncStorage.setItem(this.prefix + key, JSON.stringify(value));
    } else {
      await AsyncStorage.setItem(this.prefix + key, JSON.stringify(value));
    }
  }

  async remove(key: string): Promise<void> {
    if (!this.sync) {
      AsyncStorage.removeItem(this.prefix + key);
    } else {
      await AsyncStorage.removeItem(this.prefix + key);
    }
  }
  async clear(): Promise<void> {
    if (!this.sync) {
      AsyncStorage.clear();
    } else {
      await AsyncStorage.clear();
    }
  }
}
