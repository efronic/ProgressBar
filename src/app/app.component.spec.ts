import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Structure } from './_models/structure';
import { Bar } from './_models/bar';
import { MaterialModule } from './_shared/material.module';
import { of, Observable, observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { Input, Component } from '@angular/core';

describe('AppComponent', () => {
  @Component({
    selector: 'app-loader',
    template: '<div></div>',
  })
  class FakeLoaderComponent {
    @Input() loading: boolean;
  }
  let component: AppComponent;
  const storeMock = jasmine.createSpyObj('Store', ['select']);
  let buttons$: Observable<number[]> = of([45, 23, -8, -12]);
  let loading$: Observable<boolean> = of(true);
  let structure: Structure = {
    buttons: [45, 23, -8, -12],
    bars: [15, 34, 7, 87],
    limit: 150,
  };
  let barsObject: Bar[] = [
    { value: 15, newValue: Math.round(15 * 100) / 150 },
    { value: 34, newValue: Math.round(34 * 100) / 150 },
    { value: 7, newValue: Math.round(7 * 100) / 150 },
    { value: 87, newValue: Math.round(87 * 100) / 150 },
  ];
  // const storeMock = {
  //   select() {
  //     return of({
  //       structure: structure,
  //       buttons: [45, 23, -8, -12],
  //       bars: [15, 34, 7, 87],
  //       limit: 150,
  //       isLoading: false,
  //       error: '',
  //     });
  //   },
  // };
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    storeMock.select.and.returnValue(
      of({
        structure: structure,
        buttons: [45, 23, -8, -12],
        bars: [15, 34, 7, 87],
        limit: 150,
        isLoading: false,
        error: '',
      })
    );
    component = fixture.componentInstance;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        StoreModule.forRoot({}, {}),
      ],
      declarations: [AppComponent, FakeLoaderComponent],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();
    component.bars = barsObject;
    component.limit = structure.limit;
    component.selectedProgressBar = -1;
    component.componentActive = true;
    component.buttons$ = buttons$;
    component.loading$ = loading$;
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it(`should have as title 'Progress Bar Quiz'`, () => {
    fixture = TestBed.createComponent(AppComponent);

    expect(component.title).toEqual('Progress Bar Quiz');
  });
  // it(`should have as title 'ProgressBar'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('ProgressBar');
  // });
  it('buttons should be disabled', () => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    let el = fixture.debugElement.query(By.css('button')).nativeElement
      .disabled;
    expect(el).toBeTruthy();
  });
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'ProgressBar app is running!'
    );
  });
  it('should show value = 60 ', () => {
    fixture = TestBed.createComponent(AppComponent);
    let event = { value: 45 };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    let el = fixture.debugElement
      .query(By.css('.mat-select'))
      .triggerEventHandler('selectionChange', event);
    expect(component.selectedProgressBar).toBe(60);
  });
});
