import { Component, OnInit } from '@angular/core';
import { DataService } from './core/services/data.service';
import { takeUntil } from 'rxjs';
import { Base } from './core/components/base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends Base implements OnInit {
  title = 'Go Todo';

  ngOnInit(): void {
    this._dataService.onTitleChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((title: string) => {
        this.title = title;
      });
  }
}
