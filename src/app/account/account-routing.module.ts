import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardService } from '../service/login-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [LoginGuardService],
        children: [
            {
                path: '',
                children: [
                    { path: 'login', component: LoginComponent },
                    { path: 'register', component: RegisterComponent },
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                ]
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
