import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_shared/material.module';
import { StoreModule } from '@ngrx/store';
import { LoaderComponent } from './_shared/loader/loader.component';
import { AppService } from './_services/app.service';
import { AppReducer } from './_state/app.reducer';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './_state/app.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, LoaderComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature('progressBar', AppReducer),
    // EffectsModule.forFeature([AppEffects]),
    StoreDevtoolsModule.instrument({
      name: 'ProgressBar DevTools',
      maxAge: 50,
      logOnly: environment.production,
    }),
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
