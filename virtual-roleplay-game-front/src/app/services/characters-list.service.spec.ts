import { TestBed } from '@angular/core/testing';

import { CharactersListService } from './characters-list.service';

describe('CharactersListService', () => {
  let service: CharactersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactersListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
