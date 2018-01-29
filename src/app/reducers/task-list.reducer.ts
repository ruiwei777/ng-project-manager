import * as actions from '../actions/task-list.action';
import * as projectActions from '../actions/project.action';
import * as _ from 'lodash';
import { createSelector } from 'reselect';
import { Project, TaskList } from '../domain';

export interface State {
  ids: string[];
  entities: { [id: string]: TaskList };
  selectedIds: string[];
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: []
};

const addTaskList = (state, action) => {
  const taskList = action.payload;
  if (state.entities[taskList.id]) {
    return state
  }
  const ids = [...state.ids, taskList.id];
  const entities = { ...state.entities, [taskList.id]: taskList };
  return { ...state, ids, entities, selectedIds: [...state.selectedIds, taskList.id] };
}

const updateTaskList = (state, action) => {
  const taskList = action.payload;
  const entities = { ...state.entities, [taskList.id]: taskList };
  return { ...state, entities };
}

const delTaskList = (state, action) => {
  const taskList = action.payload;
  const newIds = state.ids.filter(id => id !== taskList.id);
  const newEntities = newIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
  const newSelectedIds = state.selectedIds.filter(id => id !== taskList.id);
  return { ids: newIds, entities: newEntities, selectedIds: newSelectedIds };
}

const loadTaskLists = (state, action) => {
  const taskLists = action.payload;
  const incomingIds = taskLists.map(t => t.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});
  return {
    ...state,
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    selectedIds: [...incomingIds]
  };
}

const swapTaskLists = (state, action) => {
  const taskLists = <TaskList[]>action.payload;
  const updatedEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = { ...state.entities, ...updatedEntities };
  return {
    ...state,
    entities: newEntities
  }
}

const selectProject = (state, action) => {
  const selected = <Project>action.payload;
  const selectedIds = state.ids.filter(id => state.entities[id].projectId === selected.id);
  return {
    ...state,
    selectedIds
  }
}

const delListByProject = (state, action) => {
  const project = <Project>action.payload;
  const taskListIds = project.taskLists;
  const remainingIds = _.difference(state.ids, taskListIds);
  const remainingEntites = remainingIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
  return {
    ids: remainingIds,
    entities: remainingEntites,
    selectedIds: []
  }
}

export function reducer(state = initialState, action: actions.ActionTypes): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTaskList(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delTaskList(state, action);
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTaskList(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadTaskLists(state, action);
    }
    case actions.ActionTypes.SWAP_SUCCESS: {
      return swapTaskLists(state, action);
    }
    case projectActions.ActionTypes.SELECT: {
      return selectProject(state, action);
    }
    case projectActions.ActionTypes.DELETE_SUCCESS: {
      return delListByProject(state, action);
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedIds = (state: State) => state.selectedIds;

export const getSelected = createSelector(getSelectedIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
})

export const getTaskLists = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});