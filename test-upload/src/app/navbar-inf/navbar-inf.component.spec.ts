import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInfComponent } from './navbar-inf.component';

describe('NavbarInfComponent', () => {
  let component: NavbarInfComponent;
  let fixture: ComponentFixture<NavbarInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
