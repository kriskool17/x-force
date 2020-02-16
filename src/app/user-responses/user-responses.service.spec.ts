import { TestBed } from '@angular/core/testing';

import { UserResponsesService } from './user-responses.service';

describe('UserResponsesService', () => {
  let service: UserResponsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserResponsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
