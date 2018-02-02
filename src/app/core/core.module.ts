import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';
import { HttpModule } from '@angular/http'; // TODO: remove this after migration
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppEffectsModule } from '../effects';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { loadSvgResources } from '../utils/svg.util';

import { environment } from '../../environments/environment';


import 'hammerjs';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';
import { ServicesModule } from '../service/service.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // After BrowserModule
    ServicesModule.forRoot(),
    AppEffectsModule,
  ],
  declarations: [
    HeaderComponent,
     FooterComponent, 
     SidebarComponent, NotFoundComponent
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent,
    AppRoutingModule
  ],
  providers:[
    {provide: 'BASE_CONFIG', useValue: {
      uri: environment.dataPath
    }}
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    domSanitizer: DomSanitizer,
    matIconRegistry: MatIconRegistry
  ) {
    if (parent) {
      throw new Error('CoreModule can only be imported in AppModule.');
    }

    loadSvgResources(matIconRegistry, domSanitizer);
  }
}
