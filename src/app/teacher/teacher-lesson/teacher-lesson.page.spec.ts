import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherLessonPage } from './teacher-lesson.page';

describe('TeacherLessonPage', () => {
  let component: TeacherLessonPage;
  let fixture: ComponentFixture<TeacherLessonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
