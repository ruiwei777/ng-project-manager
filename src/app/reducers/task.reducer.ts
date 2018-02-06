import * as actions from '../actions/task.action';
import * as projectActions from '../actions/project.action';
import * as _ from 'lodash';
import { createSelector } from 'reselect';
import { Task, Project } from '../domain';

export interface State {
  ids: string[];
  entities: { [id: string]: Task };
};

export const initialState: State = {
  ids: [],
  entities: {},
};

const addTask = (state, action) => {
  const taskList = action.payload;
  if (state.entities[taskList.id]) {
    return state
  }
  const ids = [...state.ids, taskList.id];
  const entities = { ...state.entities, [taskList.id]: taskList };
  return { ...state, ids, entities };
}

const updateTask = (state, action) => {
  const taskList = action.payload;
  const entities = { ...state.entities, [taskList.id]: taskList };
  return { ...state, entities };
}

const delTask = (state, action) => {
  const taskList = action.payload;
  const newIds = state.ids.filter(id => id !== taskList.id);
  const newEntities = newIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
  return { ids: newIds, entities: newEntities };
}

const loadTasks = (state, action) => {
  const task = action.payload;
  const incomingIds = task.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(task)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities }
  };
}


const moveAllTasks = (state, action) => {
  const tasks = <Task[]>action.payload;
  const updatedEntities = tasks.reduce((entities, task) => ({ ...entities, [task.id]: task }), {});
  return {
    ...state,
    entities: { ...state.entities, ...updatedEntities }
  }
}

const delByProject = (state, action) => {
  const project = <Project>action.payload;
  const taskListIds = project.taskLists || [];
  const remainingIds = state.ids.filter(id => taskListIds.indexOf(state.entities[id].taskListId) === -1)
  const remainingEntites = remainingIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
  return {
    ids: remainingIds,
    entities: remainingEntites
  }
}

export function reducer(state = initialState, action: actions.ActionTypes): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTask(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delTask(state, action);
    }
    case actions.ActionTypes.MOVE_SUCCESS:
    case actions.ActionTypes.COMPLETE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTask(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadTasks(state, action);
    }
    case actions.ActionTypes.MOVE_ALL_SUCCESS: {
      return moveAllTasks(state, action);
    }
    case projectActions.ActionTypes.DELETE_SUCCESS: {
      return delByProject(state, action);
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;

export const getTasks = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
})