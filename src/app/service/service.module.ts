import { NgModule } from '@angular/core';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { TaskListService } from './task-list.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { LoginGuardService } from './login-guard.service';

export {
  QuoteService,
}

@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthGuardService,
        LoginGuardService,
        AuthService,
        ProjectService,
        QuoteService,
        TaskService,
        TaskListService,
        UserService
      ]
    };
  }
}
