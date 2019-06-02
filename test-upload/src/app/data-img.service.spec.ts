import { TestBed } from '@angular/core/testing';

import { DataImgService } from './data-img.service';

describe('DataImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataImgService = TestBed.get(DataImgService);
    expect(service).toBeTruthy();
  });
});
