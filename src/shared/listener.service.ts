import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListenerService {
  loadMethod = new Subject<any>();
  private _listners = new Subject<any>();
  private _value = new BehaviorSubject<number>(0);

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  listener() {
    this._listners.next();
  }

  getValue(): Observable<any> {
    return this._value.asObservable();
  }

  setValue(item) {
    this._value.next(item);
  }
}
