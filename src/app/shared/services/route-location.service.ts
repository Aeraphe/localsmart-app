import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteLocationService {
  private subjectRouteLocation = new Subject();
  route$ = this.subjectRouteLocation.asObservable() as Observable<string>;

  constructor() {}

  setRouteLocation = (name: string) => {
    this.subjectRouteLocation.next(name);
  };

  getRouteLocation = () => {
    return this.route$;
  };
}
