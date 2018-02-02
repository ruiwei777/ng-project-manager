# ng-project-manager
An Angular task management tool. [Demo](http://ngpro.herokuapp.com/)

## Functions
Login, Register, Create new projects, Invite members to projects, create task lists for projects, create tasks for task lists...

## Features
1. MaterialUI, routing animations, theme switch
2. Lazy loading and pre-loading for feature modules
3. Latest version of ngrx with RxJS, time-travel devtools
4. Router guard

## Development
`ng serve --open`, then go to `localhost:4200/`.
Data are served by a remote json-server. You can configure you data root in `src/environment/environment.ts`

## Build
`npm run build`. It will generate all assets and an `index.html` inside the `dist` folder. Serve that `index.html` in you backend server (*not* the `index.html` in `src`). You can reference to the `server.js` file.

## File Structure
1. Everything that should be instantiated only once (Service, Effects, Sidebar...) is in CoreModule
2. Things imported everywhere are in SharedModule

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## TODO
* migrate service from Http to HttpClient

auth-guard.service

auth.service

login-guard.service

project.service

quote.service

task-list.service

~~task.service~~

user.service

* fix newTask bug
