import { TestBed } from '@angular/core/testing';

import { UploadFilePdfService } from './upload-file-pdf.service';

describe('UploadFilePdfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadFilePdfService = TestBed.get(UploadFilePdfService);
    expect(service).toBeTruthy();
  });
});
