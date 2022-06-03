import { TestBed } from '@angular/core/testing';

import { ExecutorGuard } from './executor.guard';

describe('ExecutorGuard', () => {
  let guard: ExecutorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExecutorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
