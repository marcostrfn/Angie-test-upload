import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDetectComponent } from './upload-detect.component';

describe('UploadDetectComponent', () => {
  let component: UploadDetectComponent;
  let fixture: ComponentFixture<UploadDetectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDetectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
