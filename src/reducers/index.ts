import {combineReducers} from 'redux';

import projectsReducer, {State as ProjectsState} from './projects';
import listsReducer, {State as ListsState} from './lists';
import taskReducer, {State as TaskState} from './projects/tasks/show';

export type RootStore = {
  projects: ProjectsState;
  lists: ListsState;
  task: TaskState;
};

const reducers = () =>
  combineReducers<RootStore>({
    projects: projectsReducer,
    lists: listsReducer,
    task: taskReducer,
  });

export default reducers;
