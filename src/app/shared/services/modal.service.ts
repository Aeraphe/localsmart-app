import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OveflowBodyService } from '../services/oveflow-body.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private stateSubject = new Subject();
  private modalState$ = this.stateSubject.asObservable() as Observable<boolean>;
  constructor(private overflowBody: OveflowBodyService) {}

  getModalState = () => {
    return this.modalState$;
  };

  openModal = () => {
    this.stateSubject.next(true);
    this.overflowBody.activeOverflowBody();
  };

  closeModal = () => {
    this.stateSubject.next(false);
    this.overflowBody.removeOverflowBody();
  };
}
