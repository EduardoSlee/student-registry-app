import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  pageTitle = 'Student List';
  students: Student[] = [];
  selectedCreateDate = new FormControl(new Date());
 
  constructor(
    private router: Router,
    private studentService: StudentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Student deleted successfully'});
        this.loadStudents();
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }

  addStudent() {
    this.router.navigate(['/student-detail']);
  }

  editStudent(id: number) {
    this.router.navigate(['/student-detail', id]);
  }

  getStudentsExcelReport() {
    let createDate: Date | null = this.selectedCreateDate.value;

    this.studentService.getStudentsExcelReport(createDate).subscribe(data => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = url;
      link.download = 'students.xlsx';
      link.click();
    });
  }
}