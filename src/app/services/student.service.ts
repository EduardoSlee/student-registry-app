import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../environments/environment';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    private apiUrl = environment.apiUrlRoot + '/students';
    private httpOptions = {
        headers: new HttpHeaders({ 'X-Api-Key': environment.apiKey })
    };

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}`, this.httpOptions);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, this.httpOptions);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url, this.httpOptions);
  }

  updateStudent(student: Student): Observable<Student> {
    const url = `${this.apiUrl}/${student.id}`;
    return this.http.put<Student>(url, student, this.httpOptions);
  }

  deleteStudent(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }

  getStudentsExcelReport(createDate: Date | null): Observable<Blob> {
    const url = `${this.apiUrl}/excel`;
    return this.http.get(url, {
      params: createDate ? { createDate: createDate.toISOString() } : {},
      responseType: 'blob',
      headers: this.httpOptions.headers
    });
  }  
}
