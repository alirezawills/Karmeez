/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListenerService } from './listener.service';

describe('Service: Listener', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListenerService]
    });
  });

  it('should ...', inject([ListenerService], (service: ListenerService) => {
    expect(service).toBeTruthy();
  }));
});
