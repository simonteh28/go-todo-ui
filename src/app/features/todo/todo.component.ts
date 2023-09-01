import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule, NgFor } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { CreateEditTodoComponent } from './create-edit-todo/create-edit-todo.component';
import { CreateEditTodo, Todo } from './todo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Base } from 'src/app/core/components/base';
import { DeleteDialogComponent } from 'src/app/core/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, CdkDropList, NgFor, CdkDrag],
})
export class TodoComponent extends Base implements OnInit {
  todos: Todo[] = [];
  completedTodos: Todo[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchTodoList();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  fetchTodoList() {
    this._isLoading = true;
    this._apiService
      .get('todo')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        this._isLoading = false;
        this.todos = res.body;
        let [ctodos, todos] = this._splitCompleted(
          res.body as Todo[],
          (x: Todo) => x.completed
        );
        this.todos = todos;
        this.completedTodos = ctodos;
      });
  }

  private _splitCompleted(array: any[], condition: Function) {
    return array.reduce(
      (arr, e) => {
        arr[condition(e) ? 0 : 1].push(e);
        return arr;
      },
      [[], []]
    );
  }

  createEditTodo(todo?: Todo) {
    let action = todo ? 'Edit' : 'Create';
    let newDate = todo ? new Date(todo.date) : new Date();
    newDate.setSeconds(0);
    let data: CreateEditTodo = {
      action: action,
      id: todo ? todo.id : '',
      title: todo ? todo.title : '',
      description: todo ? todo.description : '',
      date: newDate,
    };

    if (this._isMobileDevice) {
      this.router
        .navigate(['../createedittodo'], {
          relativeTo: this.route,
        })
        .then((x) => {
          this._dataService.onOpenForm.next(data);
        });
    } else {
      const dialogRef = this.dialog.open(CreateEditTodoComponent, {
        enterAnimationDuration: 300,
        width: '40%',
      });

      dialogRef
        .afterOpened()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((status) => {
          this._dataService.onOpenForm.next(data);
        });

      dialogRef
        .afterClosed()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((status) => {
          this.fetchTodoList();
        });
    }
  }

  deleteTodo(todo: Todo) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '40%',
      data: todo,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((status) => {
        this.fetchTodoList();
      });
  }

  markCompleted(todo: Todo, isUndo: boolean = false) {
    this._apiService
      .patch('todo/' + todo.id, {
        completed: !isUndo,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        this.fetchTodoList();
      });
  }
}
