import {combineReducers} from 'redux';

import projectsReducer, {State as ProjectsState} from './projects';
import listsReducer, {State as ListsState} from './lists';
import tasksReducer, {State as TasksState} from './tasks';

export type RootStore = {
  projects: ProjectsState;
  lists: ListsState;
  tasks: TasksState;
};

const reducers = () =>
  combineReducers<RootStore>({
    projects: projectsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
  });

export default reducers;
