import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserscomponentComponent } from './userscomponent.component';

describe('UserscomponentComponent', () => {
  let component: UserscomponentComponent;
  let fixture: ComponentFixture<UserscomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserscomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
