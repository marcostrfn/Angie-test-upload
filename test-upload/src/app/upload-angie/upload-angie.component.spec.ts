import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAngieComponent } from './upload-angie.component';

describe('UploadAngieComponent', () => {
  let component: UploadAngieComponent;
  let fixture: ComponentFixture<UploadAngieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAngieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAngieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
