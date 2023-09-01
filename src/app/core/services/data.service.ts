import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  // Singleton service
  providedIn: 'root',
})
export class DataService {
  onOpenForm: ReplaySubject<any>;
  onCloseForm: ReplaySubject<any>;
  onTitleChange: Subject<string>;

  constructor() {
    this.onOpenForm = new ReplaySubject();
    this.onCloseForm = new ReplaySubject();
    this.onTitleChange = new Subject();
  }
}
