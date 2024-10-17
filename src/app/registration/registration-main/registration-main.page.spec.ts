import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationMainPage } from './registration-main.page';

describe('RegistrationMainPage', () => {
  let component: RegistrationMainPage;
  let fixture: ComponentFixture<RegistrationMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
