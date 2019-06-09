import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAngiePdfComponent } from './upload-angie-pdf.component';

describe('UploadAngiePdfComponent', () => {
  let component: UploadAngiePdfComponent;
  let fixture: ComponentFixture<UploadAngiePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAngiePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAngiePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
