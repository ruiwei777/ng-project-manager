import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { loadSvgResources } from '../utils/svg.util';

import 'hammerjs';
import 'rxjs/add/operator/take';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent,
     FooterComponent, 
     SidebarComponent
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent,
    AppRoutingModule
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
