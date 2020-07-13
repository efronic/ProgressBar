import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from './_shared/material.module';
import { AppComponent } from './app.component';
import { getBars } from './_state/app.state';
import { Input, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Structure } from './_models/structure';
import { Bar } from './_models/bar';
import { By } from '@angular/platform-browser';
import { MatSelectChange } from '@angular/material/select';

describe('AppComponent', () => {
  @Component({
    selector: 'app-loader',
    template: '<div></div>',
  })
  class FakeLoaderComponent {
    @Input() loading: boolean;
  }
  let component: AppComponent;
  let store: MockStore;
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
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    // fixture = TestBed.createComponent(AppComponent);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule, MaterialModule],
      providers: [provideMockStore()],
      declarations: [AppComponent],
    }).compileComponents();
    // component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(getBars, []);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    component.bars = barsObject;
    component.limit = structure.limit;
    component.selectedProgressBar = 10;
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

  it('should show value = 45 ', () => {
    fixture = TestBed.createComponent(AppComponent);

    component.onSelected(new MatSelectChange(null, 45));

    expect(component.selectedProgressBar).toBe(45);
  });
  it('should show value = 79 ', () => {
    fixture = TestBed.createComponent(AppComponent);
    component.selectedProgressBar = 1

    component.onClick(45);

    expect(component.bars[component.selectedProgressBar].value).toBe(79);
  });
  it('should show value = 40 ', () => {
    fixture = TestBed.createComponent(AppComponent);
    component.selectedProgressBar = 0

    component.onClick(45);

    expect(component.bars[component.selectedProgressBar].newValue).toBe(40);
  });
});
