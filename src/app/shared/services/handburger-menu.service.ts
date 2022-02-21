import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandburgerMenuService {
  private subClick = new Subject();
  private click$: Observable<boolean> =
    this.subClick.asObservable() as Observable<boolean>;

  constructor() {}

  onClickHandBurger = (state: boolean): void => {
    this.subClick.next(state);
  };
  getHandBurgerClick = (): Observable<boolean> => {
    return this.click$;
  };
}
