import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TeacherAssignmentPageRoutingModule } from './teacher-assignment-routing.module';
import { TeacherAssignmentPage } from './teacher-assignment.page';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherAssignmentPageRoutingModule,
  ],
  declarations: [TeacherAssignmentPage],
  providers: [
    provideFirestore(() => getFirestore()) // Add this line
  ] 
})
export class TeacherAssignmentPageModule { }