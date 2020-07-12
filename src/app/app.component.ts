import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Observable,
  Subject,
  combineLatest,
  EMPTY,
  BehaviorSubject,
} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import {
  takeWhile,
  map,
  catchError,
  tap,
  distinctUntilChanged,
  distinctUntilKeyChanged,
} from 'rxjs/operators';

import * as fromAppState from './_state/app.state';
import * as fromAppActions from './_state/app.actions';
import { Bar } from './_models/bar';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ProgressBar';
  loading$: Observable<boolean>;
  buttons$: Observable<number[]>;
  initialBars$: Observable<number[]>;
  bars$: Observable<number[]>;
  bars: Bar[];
  limit: number;
  dropDowns$: Observable<Bar[]>;
  selectedProgressBar: number = -1;
  componentActive = true;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  // private progressBarSelectedSubject = new BehaviorSubject<number>(-1);
  // progressBarSelectedAction$ = this.progressBarSelectedSubject.asObservable();

  // private buttonClickedSubject = new BehaviorSubject<number>(-1);
  // buttonClickedAction$ = this.buttonClickedSubject.asObservable();
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
    this.dropDowns$ = this.store.pipe(
      select(fromAppState.getBars),
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
    // this.bars$ = combineLatest([
    //   this.bars$,
    //   this.progressBarSelectedAction$,
    //   this.buttonClickedAction$,
    // ]).pipe(
    //   tap((p) => console.log('before ', p)),

    //   map(([bars, selectedBar, selectedButton]) =>
    //     bars.map(
    //       (bar, index) =>
    //         (index === selectedBar
    //           ? (bar = bar + selectedButton)
    //           : bar) as number
    //     )
    //   ),
    //   tap((p) => {
    //     console.log('after ', p);
    //   }),
    //   catchError((err) => {
    //     this.errorMessageSubject.next(err);
    //     return EMPTY;
    //   })
    // );
  }
  onSelected(event: any) {
    console.log('barIndex', event);
    this.selectedProgressBar = event.value;

    console.log('this.selectedProgressBar', this.selectedProgressBar);
    // this.selectedProgressBar = barIndex;
    // if (event.source.selected) this.progressBarSelectedSubject.next(+barIndex);
    // this.bars$.subscribe((p) => {
    //   p[this.selectedProgressBar] = p[this.selectedProgressBar] + button;
    // });
  }
  onClick(button: number) {
    console.log('selectedButton ', button);
    const currentValue = this.bars[this.selectedProgressBar];
    this.bars[this.selectedProgressBar] = {
      ...this.bars[this.selectedProgressBar],
    };
    let newValue =
      Math.round((this.bars[this.selectedProgressBar].value + button) * 100) /
      this.limit;
    console.log('currentValue', currentValue);

    console.log('newValue', newValue);

    this.bars[this.selectedProgressBar].newValue = newValue > 0 ? newValue : 0;
    this.bars[this.selectedProgressBar].value =
      currentValue.value + button > 0 ? currentValue.value + button : 0;
    // currentValue.value + button > this.limit ? (this.color = 'accent') : (this.color = 'primary');
    // this.bars$.pipe(
    //   map((p) => {
    //     p[this.selectedProgressBar] = p[this.selectedProgressBar] + button;
    //   }),
    //   tap((p) => console.log('new bars ', p))
    // );
    // this.buttonClickedSubject.next(+button);
  }
  ngOnDestroy() {
    this.componentActive = false;
  }
}
