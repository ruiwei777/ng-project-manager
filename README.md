# ng-project-manager
An Angular task management tool. [Demo](http://ngpro.herokuapp.com/)

## Functions
Login, Register, Create new projects, Invite members to projects, create task lists for projects, create tasks for task lists...

## Features
1. MaterialUI, routing animations, theme switch
2. Lazy loading and pre-loading for feature modules
3. Latest version of Ngrx with RxJS, time-travel devtools
4. Router guard
5. Drag & drop driectives

## Development
`npm install`

`npm install -g json-server concurrently` (might need `sudo` depending on you npm path)

`ng run dev`, default port: 4200

Data are served by `json-server`. You can configure you data root in `src/environment/environment.ts`

## Build
`npm run build`. To run it locally after production build, `node server.js`

## File Structure
1. Everything that should be instantiated only once (Service, Effects, Sidebar...) is in `CoreModule`
2. Things imported everywhere (`CommonModule`, `FormsModule`, pipes, directives, shared components...) are in `SharedModule`

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Recent Updates
* migrated all service from Http to HttpClient

* finished drag&drop under /projects




