import { Component, Inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { Todo } from 'src/app/features/todo/todo.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Base } from '../base';
import { DialogRef } from '@angular/cdk/dialog';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent extends Base {
  todo: Todo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private _dialogRef: DialogRef,
    injector: Injector
  ) {
    super(injector);
    this.todo = data;
  }

  close() {
    this._dialogRef.close();
  }

  confirm() {
    this._apiService
      .delete('todo/' + this.todo.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this.close();
      });
  }
}
