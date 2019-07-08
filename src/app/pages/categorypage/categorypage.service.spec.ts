import { TestBed } from '@angular/core/testing';

import { CategorypageService } from './categorypage.service';

describe('CategorypageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategorypageService = TestBed.get(CategorypageService);
    expect(service).toBeTruthy();
  });
});
