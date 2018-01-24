import { NgModule } from '@angular/core';
import { Params, RouterStateSnapshot } from '@angular/router';
import { StoreModule, combineReducers, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment';

import { createSelector } from 'reselect';
import { Auth } from '../domain';

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromTaskList from './task-list.reducer';
import * as fromTask from './task.reducer';
import * as fromUser from './user.reducer';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  auth: Auth,
  quote: fromQuote.State,
  router: RouterReducerState<RouterStateUrl>,
  projects: fromProject.State,
  taskLists: fromTaskList.State,
  tasks: fromTask.State,
  users: fromUser.State
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  quote: fromQuote.reducer,
  router: routerReducer,
  projects: fromProject.reducer,
  taskLists: fromTaskList.reducer,
  tasks: fromTask.reducer,
  users: fromUser.reducer
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.projects;
export const getTaskListState = (state: State) => state.taskLists;
export const getTaskState = (state: State) => state.tasks;
export const getUserState = (state: State) => state.users;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAll);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);
// export const getTaskLists = createSelector(getTaskListState, fromTaskList.getTaskLists);
export const getTasks = createSelector(getTaskState, fromTask.getTasks);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserEntities = createSelector(getUserState, fromUser.getEntities)
export const getTasksWithOwners = createSelector(getTasks, getUserEntities, (tasks, userEntities) => {
  return tasks.map(task => {
    return {
      ...task,
      owner: userEntities[task.ownerId],
      participants: task.participantIds.map(id => userEntities[id])
    };
  });
});

export const getTasksByLists = createSelector(getTaskLists, getTasksWithOwners, (lists, tasks) => {
  return lists.map(list => {
    return {
      ...list,
      tasks: tasks.filter(task => task.taskListId === list.id)
    }
  })
})

export const getProjectUsers = (projectId: string) => createSelector(getProjectState, getUserEntities, (state, entities) => {
  return state.entities[projectId].members.map(id => entities[id] )
})
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class AppStoreModule { }