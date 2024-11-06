import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherMainPage } from './teacher-main.page';

describe('TeacherMainPage', () => {
  let component: TeacherMainPage;
  let fixture: ComponentFixture<TeacherMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
