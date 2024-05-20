import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'student-list', pathMatch: 'full' },
  { path: 'student-list', component: StudentListComponent },
  { path: 'student-detail/:id', component: StudentDetailComponent },
  { path: 'student-detail', component: StudentDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}