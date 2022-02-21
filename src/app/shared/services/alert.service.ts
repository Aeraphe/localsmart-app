import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OveflowBodyService } from './oveflow-body.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private stateSubject = new Subject();
  private alertState$ = this.stateSubject.asObservable() as Observable<boolean>;
  constructor(private overflowBody: OveflowBodyService) {}

  getAlertState = () => {
    return this.alertState$;
  };

  openAlert = () => {
    this.stateSubject.next(true);
    this.overflowBody.activeOverflowBody();
  };

  closeAlert = () => {
    this.stateSubject.next(false);
    this.overflowBody.removeOverflowBody();
  };
}
