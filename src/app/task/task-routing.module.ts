import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskHomeComponent } from './task-home/task-home.component';
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [
    { path: ':id', component: TaskHomeComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
