import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskHomeComponent } from './task-home/task-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: TaskHomeComponent },
    // { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
