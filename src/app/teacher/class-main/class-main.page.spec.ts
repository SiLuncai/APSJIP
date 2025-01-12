import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassMainPage } from './class-main.page';

describe('ClassMainPage', () => {
  let component: ClassMainPage;
  let fixture: ComponentFixture<ClassMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
