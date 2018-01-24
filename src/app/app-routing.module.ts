import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', redirectTo: 'account/login', pathMatch: 'full' },
    { path: 'account', loadChildren: 'app/account/account.module#AccountModule' },
    { path: 'projects', loadChildren: 'app/project/project.module#ProjectModule' },
    { path: 'tasklists', loadChildren: 'app/task/task.module#TaskModule' },
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
