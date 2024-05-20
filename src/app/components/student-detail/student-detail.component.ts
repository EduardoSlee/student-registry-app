import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { CountryService } from '../../services/country.service';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})

export class StudentDetailComponent implements OnInit {
  studentForm!: FormGroup;
  countries: any[] = [];
  editingStudent: Student | null = null;
  pageTitle = 'Student Detail';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService,
    private countryService: CountryService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCountries();
    if (id) {
      this.loadStudent(id);
    }
  }

  initForm() {
    this.studentForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      phoneNumber: [''],
      nationality: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }

  loadStudent(id: number) {    
    this.studentService.getStudent(id)
      .subscribe(student =>
        {
          this.editingStudent = student;
          this.editingStudent.birthDate = new Date(this.editingStudent.birthDate);
          this.studentForm.patchValue(this.editingStudent);
        });
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(
      (countries) => {
        this.countries = countries.map((country) => country.name.common);
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  onFileSelect(event: any) {
    if (event.files.length > 0) {
      const file: File = event.files[0];
      const maxFileSize = 1000000; // Maximum file size in bytes

      if (file.size <= maxFileSize) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64String = e.target.result;
          this.studentForm.patchValue({ photo: base64String });
        };
        reader.readAsDataURL(file);
      } else {
        console.error('File size exceeds the maximum allowed size');
      }
    }
  }

  onFileRemove() {
    this.studentForm.patchValue({ photo: null });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const student = this.studentForm.value;
      student.birthDate = this.formatDate(student.birthDate);
      if (this.editingStudent) {
        student.id = this.editingStudent.id;
        this.studentService.updateStudent(student).subscribe(
          () => {
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Student updated successfully'});
            this.editingStudent = null;
            this.studentForm.reset();
            this.onBack();
          },
          (error) => {
            console.error('Error updating student:', error);
          }
        );
      } else {
        this.studentService.addStudent(student).subscribe(
          () => {
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Student created successfully'});
            this.studentForm.reset();
            this.onBack();
          },
          (error) => {
            console.error('Error creating student:', error);
          }
        );
      }
    }
  }
 
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  cancelEdit() {
    this.editingStudent = null;
    this.studentForm.reset();
    this.onBack();
  }

  onBack(): void {
    this.router.navigate(['/student-list']);
  }
}
