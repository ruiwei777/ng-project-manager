import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './quote.effects';
import { RouterEffects } from './router.effects';
import { AuthEffects } from './auth.effects';
import { ProjectEffects } from './project.effects';
import { TaskListEffects } from './task-list.effects';
import { TaskEffects } from './task.effects';
import { UserEffects } from './user.effets';

@NgModule({
    imports: [EffectsModule.forRoot([
        AuthEffects, 
        QuoteEffects, 
        RouterEffects, 
        ProjectEffects, 
        TaskListEffects, 
        TaskEffects,
        UserEffects
    ])],
})
export class AppEffectsModule { }