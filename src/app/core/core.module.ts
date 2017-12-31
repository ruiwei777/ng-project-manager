import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { loadSvgResources } from '../utils/svg.util';

import 'hammerjs';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent, FooterComponent, SidebarComponent
  ],
  exports: [
    HeaderComponent, FooterComponent, SidebarComponent
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
