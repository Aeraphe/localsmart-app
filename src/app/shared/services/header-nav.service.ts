import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderNavService {
  private headerNavState = true;

  private subject = new BehaviorSubject<Boolean>(this.headerNavState);

  private headerState$: Observable<Boolean> = this.subject.asObservable();

  constructor() {}

  open = (): void => {
    this.headerNavState = true;
    this.subject.next(this.headerNavState);
  };

  close = (): void => {
    this.headerNavState =false;
    this.subject.next(this.headerNavState);
  };

  getHeaderState = (): Observable<Boolean> => {
    return this.headerState$;
  };
}
