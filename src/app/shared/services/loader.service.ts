import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private subjectLoader = new Subject();
  loader$ = this.subjectLoader.asObservable() as Observable<boolean>;

  constructor() {}

  setLoaderState = (state: boolean) => {
    this.subjectLoader.next(state);
  };

  getLoaderState = () => {
    return this.loader$;
  };
}
