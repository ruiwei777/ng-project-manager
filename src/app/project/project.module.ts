import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { InviteComponent } from './invite/invite.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    ProjectRoutingModule,
    SharedModule,
    // CoreModule
  ],
  declarations: [
    ProjectListComponent,
    NewProjectComponent,
    ProjectItemComponent,
    InviteComponent
  ],
  entryComponents: [
    NewProjectComponent,
    InviteComponent
  ]
})
export class ProjectModule { }
