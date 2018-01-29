import * as actions from '../actions/project.action';
import { Project } from '../domain/index';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];
  entities: { [id: string]: Project };
  selectedId: string | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null
};

const addProject = (state, action) => {
  const project = action.payload;
  if (state.entities[project.id]) {
    return state
  }
  const ids = [...state.ids, project.id];
  const entities = { ...state.entities, [project.id]: project };
  return { ...state, ids, entities };
}

const updateProject = (state, action) => {
  const project = action.payload;
  const entities = { ...state.entities, [project.id]: project };
  return { ...state, entities };
}

const delProject = (state, action) => {
  const project = action.payload;
  const newIds = state.ids.filter(id => id !== project.id);
  const newEntities = newIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
  return { ids: newIds, entities: newEntities, selectedId: null };
}

const loadProjects = (state, action) => {
  const projects = action.payload;
  const incomingIds = projects.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(projects)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    selectedId: null
  };
}

export function reducer(state = initialState, action: actions.ActionTypes): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addProject(state, action);

    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delProject(state, action);

    }
    case actions.ActionTypes.INVITE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateProject(state, action);

    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadProjects(state, action);

    }
    case actions.ActionTypes.SELECT: {
      const project = <Project>action.payload;
      return {
        ...state, selectedId: project.id
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

export const getAll = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
})