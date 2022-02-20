import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private subClick = new BehaviorSubject(false);
  private click$ = this.subClick.asObservable();

  constructor() {}

  changeOverlayState = (state: boolean): void => {
    this.subClick.next(state);
  };
  getOverlayState = (): Observable<boolean> => {
    return this.click$;
  };
}
