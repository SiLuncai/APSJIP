import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentRegistrationPage } from './parent-registration.page';

describe('ParentRegistrationPage', () => {
  let component: ParentRegistrationPage;
  let fixture: ComponentFixture<ParentRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
