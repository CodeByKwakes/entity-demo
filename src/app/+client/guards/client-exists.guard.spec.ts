import { TestBed, async, inject } from '@angular/core/testing';

import { ClientExistsGuard } from './client-exists.guard';

describe('ClientExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientExistsGuard]
    });
  });

  it('should ...', inject([ClientExistsGuard], (guard: ClientExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
