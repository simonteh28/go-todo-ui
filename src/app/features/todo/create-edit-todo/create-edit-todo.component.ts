import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { Base } from 'src/app/core/components/base';
import { Router } from '@angular/router';
import { CreateEditTodo } from '../todo.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'create-edit-todo',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './create-edit-todo.component.html',
  styleUrls: ['./create-edit-todo.component.scss'],
})
export class CreateEditTodoComponent extends Base implements OnInit {
  _dialogRef: DialogRef | null;
  _data?: CreateEditTodo;

  constructor(private _router: Router, _injector: Injector) {
    super(_injector);
    this._dialogRef = this._injector.get(DialogRef, null);
  }

  ngOnInit(): void {
    this._dataService.onOpenForm.subscribe((data) => {
      if (data) {
        this._data = data;
        if (!this._dialogRef) {
          // Delay title change due to change detection already completed it's binding
          Promise.resolve().then(() =>
            this._dataService.onTitleChange.next(this._data?.action + ' Todo')
          );
        }
      }
    });
  }

  handleSubmit() {
    if (this._data?.action == 'Create') {
      this.createTodo();
    } else {
      this.editTodo();
    }
  }

  createTodo() {
    this._apiService
      .post('todo', {
        title: this._data?.title,
        description: this._data?.description,
        date: this._data?.date.toISOString(),
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        if (this._isMobileDevice) {
          this.back();
        } else {
          this.closeDialog();
        }
      });
  }

  editTodo() {
    this._apiService
      .patch('todo/' + this._data?.id, {
        title: this._data?.title,
        description: this._data?.description,
        date: this._data?.date.toISOString(),
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        if (this._isMobileDevice) {
          this.back();
        } else {
          this.closeDialog();
        }
      });
  }

  back() {
    this._router.navigate(['..']);
    this._dataService.onTitleChange.next('Go Todo');
  }

  closeDialog() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }
}
