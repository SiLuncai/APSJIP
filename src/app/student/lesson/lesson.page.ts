import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage {

  constructor(private router: Router) { }

  goToLesson(level: string) {
    // Logic to navigate to the selected level's lesson page
    this.router.navigateByUrl(`/lesson/${level}`);
  }
}
