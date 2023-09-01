import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { CreateEditTodoComponent } from './todo/create-edit-todo/create-edit-todo.component';

// To Handle for future additional features
// Consider to lazy load the component
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo',
  },
  { path: 'todo', component: TodoComponent },
  { path: 'createedittodo', component: CreateEditTodoComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), TodoComponent],
})
export class FeaturesModule {}
