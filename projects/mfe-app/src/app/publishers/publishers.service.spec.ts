import { TestBed } from '@angular/core/testing';

import { PublishersService } from './publishers.service';

describe('PublishersService', () => {
  let service: PublishersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
