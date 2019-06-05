import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUploadComponent } from './navbar-upload.component';

describe('NavbarUploadComponent', () => {
  let component: NavbarUploadComponent;
  let fixture: ComponentFixture<NavbarUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
