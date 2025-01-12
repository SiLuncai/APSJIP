import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.page.html',
  styleUrls: ['./class-management.page.scss'],
})
export class ClassManagementPage implements OnInit {
  classes: any[] = [];  // Array to store classes
  newClass: any = { name: '' };  // Object for new class input
  editClassData: any = {};  // Class data for editing
  isEditModalOpen: boolean = false;  // Flag to control the modal

  constructor(
    private classService: ClassService,
    private alertController: AlertController, // Inject AlertController
    private navController: NavController
    ) {}

  ngOnInit() {
    this.loadClasses();
  }

  // Load classes from the service
  async loadClasses() {
    try {
      const data = await this.classService.getClasses();  // Fetch the classes
      this.classes = data;  // Assign the data to the classes array
    } catch (error) {
      
      console.error('Error loading classes:', error);
    }
  }

  // Show error alert
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Add a new class
  addClass() {
    if (!this.newClass.name.trim()) {
      this.showAlert('Error', 'Class name cannot be empty.'); // Show alert if the name is empty
      return;
    }
    if (this.classes.some(c => c.name.toLowerCase() === this.newClass.name.toLowerCase())) {
      this.showAlert('Error', 'Class name already exists.'); // Show alert if the class name exists
      return;
    }
    this.classService.addClass(this.newClass.name).then(() => {
      this.newClass.name = '';  // Clear input
      this.loadClasses();      // Reload classes
      this.showAlert('Success', 'Class added successfully.');
    });
  }

  // Open the Edit Modal
  openEditModal(classData: any) {
    this.editClassData = { ...classData };  // Create a copy of the class to edit
    this.isEditModalOpen = true;  // Open the modal
  }

  // Close the Edit Modal
  closeEditModal() {
    this.isEditModalOpen = false;  // Close the modal
    this.editClassData = {};  // Reset edit data
  }

  // Update class data after editing
  updateClass() {
    if (!this.editClassData.name.trim()) {
      this.showAlert('Error', 'Class name cannot be empty.'); // Show alert if the name is empty
      return;
    }
    if (this.classes.some(c => c.name.toLowerCase() === this.editClassData.name.toLowerCase())) {
      this.showAlert('Error', 'Class name already exists.'); // Show alert if the class name exists
      return;
    }
    this.classService.updateClass(this.editClassData.id, this.editClassData.name).then(() => {
      this.closeEditModal();  // Close the modal after updating
      this.loadClasses();     // Reload classes
      this.showAlert('Success', 'Class name updated successfully.');
    });
  }

  // Delete a class
  deleteClass(classData: any) {
    this.classService.deleteClass(classData.id).then(() => {
      this.loadClasses();  // Reload the classes after deletion
      this.showAlert('Success', 'Class deleted successfully.');
    });
  }

  navigateBack() {
    this.closeEditModal();  // Ensure the modal is closed before navigation
  }
}
