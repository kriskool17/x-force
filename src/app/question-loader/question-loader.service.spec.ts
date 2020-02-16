import { TestBed } from '@angular/core/testing';

import { QuestionLoaderService } from './question-loader.service';

describe('QuestionLoaderService', () => {
  let service: QuestionLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
