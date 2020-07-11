import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeWhile } from 'rxjs/operators';

import * as fromAppState from './_state/app.state';
import * as fromAppActions from './_state/app.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ProgressBar';
  loading$: Observable<boolean>;
  buttons$: Observable<number[]>;
  bars$: Observable<number[]>;
  selectedProgressBar: number = -1;
  componentActive = true;
  constructor(
    private store: Store<fromAppState.AppState> // private actions$: Actions
  ) {}
  ngOnInit() {
    this.store.dispatch(new fromAppActions.Load());
    console.log('this.selectedprogressbar on init', this.selectedProgressBar);

    this.loading$ = this.store.pipe(
      select(fromAppState.getIsLoading),
      takeWhile(() => this.componentActive)
    );
    this.bars$ = this.store.pipe(
      select(fromAppState.getBars),
      takeWhile(() => this.componentActive)
    );
    this.buttons$ = this.store.pipe(
      select(fromAppState.getButtons),
      takeWhile(() => this.componentActive)
    );
  }
  onClick(button: number) {
    console.log(button);
    console.log(this.selectedProgressBar);
    this.bars$.subscribe((p) => {
      p[this.selectedProgressBar] = p[this.selectedProgressBar] + button;
    });
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
