import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../services/data.service';
import { ApiService } from '../services/api.service';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
  template: '',
})
export abstract class Base implements OnDestroy {
  protected _unsubscribeAll: Subject<any>;
  protected _isMobileDevice: boolean;
  protected _dataService: DataService;
  protected _apiService: ApiService;
  protected _cd: ChangeDetectorRef;
  protected _isLoading: boolean = false;

  constructor(protected _injector: Injector) {
    this._unsubscribeAll = new Subject();
    this._isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    this._dataService = this._injector.get(DataService);
    this._apiService = this._injector.get(ApiService);
    this._cd = this._injector.get(ChangeDetectorRef);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
