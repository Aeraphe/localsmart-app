import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandburgerMenuService {
  private subClick = new BehaviorSubject(false);
  private click$ = this.subClick.asObservable();

  constructor() {}

  onClickHandBurger = (state: boolean): void => {
    this.subClick.next(state);
  };
  getHandBurgerClick = (): Observable<boolean> => {
    return this.click$;
  };
}
