import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import * as fromAppState from './_state/app.state';
import * as fromAppActions from './_state/app.actions';
import { Bar } from './_models/bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Progress Bar Quiz';
  loading$: Observable<boolean>;
  buttons$: Observable<number[]>;
  bars: Bar[];
  limit: number;
  selectedProgressBar: number = -1;
  componentActive = true;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private store: Store<fromAppState.AppState>) {}
  ngOnInit() {
    this.store.dispatch(new fromAppActions.Load());

    this.loading$ = this.store.pipe(
      select(fromAppState.getIsLoading),
      takeWhile(() => this.componentActive)
    );

    this.store
      .pipe(
        select(fromAppState.getBars),
        takeWhile(() => this.componentActive)
      )
      .subscribe((bars: Bar[]) => {
        this.bars = [...bars];
      });
    this.store
      .pipe(
        select(fromAppState.getLimit),
        takeWhile(() => this.componentActive)
      )
      .subscribe((limit: number) => {
        this.limit = limit;
      });
    this.buttons$ = this.store.pipe(
      select(fromAppState.getButtons),
      takeWhile(() => this.componentActive)
    );
  }
  onSelected(event: any) {
    this.selectedProgressBar = event.value;
  }

  onClick(button: number) {
    const currentValue = this.bars[this.selectedProgressBar];
    this.bars[this.selectedProgressBar] = {
      ...this.bars[this.selectedProgressBar],
    };
    let newValue =
      Math.round((this.bars[this.selectedProgressBar].value + button) * 100) /
      this.limit;

    this.bars[this.selectedProgressBar].newValue = newValue > 0 ? newValue : 0;
    this.bars[this.selectedProgressBar].value =
      currentValue.value + button > 0 ? currentValue.value + button : 0;
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
