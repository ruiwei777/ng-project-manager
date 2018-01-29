import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', redirectTo: 'account/login', pathMatch: 'full' },
    { path: 'account', loadChildren: 'app/account/account.module#AccountModule', data: { preload: true } },
    { path: 'projects', loadChildren: 'app/project/project.module#ProjectModule', data: { preload: true } },
    { path: 'tasklists', loadChildren: 'app/task/task.module#TaskModule', data: { preload: true } },
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: SelectivePreloadingStrategy
        })
    ],
    exports: [RouterModule],
    providers: [
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule { }
