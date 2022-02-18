import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderNavService {
  private headerNavState = false;

  private subject = new BehaviorSubject<Boolean>(this.headerNavState);

  private headerState$: Observable<Boolean> = this.subject.asObservable();

  constructor() {}

  toogle = (): void => {
    this.headerNavState = !this.headerNavState;
    this.subject.next(this.headerNavState);
  };

  getHeaderState = (): Observable<Boolean> => {
    return this.headerState$;
  };
}
