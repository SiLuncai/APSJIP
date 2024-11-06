import { Component } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage {
  lessonDescription: string = '';

  constructor() {}

  // You can add more logic here, like saving the description or loading data
}
