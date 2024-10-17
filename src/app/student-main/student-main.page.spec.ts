import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentMainPage } from './student-main.page';

describe('StudentMainPage', () => {
  let component: StudentMainPage;
  let fixture: ComponentFixture<StudentMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
