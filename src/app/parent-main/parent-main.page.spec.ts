import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentMainPage } from './parent-main.page';

describe('ParentMainPage', () => {
  let component: ParentMainPage;
  let fixture: ComponentFixture<ParentMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
