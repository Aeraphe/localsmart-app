import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  action = false;
  private subjectToogle = new BehaviorSubject(this.action);
  private search$ = this.subjectToogle.asObservable();

  constructor() {}

  toogle = () => {
    this.action = !this.action;
    this.subjectToogle.next(this.action);
  };

  searchAction = () => {
    return this.search$;
  };
}
