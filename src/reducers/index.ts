import {combineReducers} from 'redux';

import projectsReducer, {State as ProjectsState} from './projects';
import listsReducer, {State as ListsState} from './lists';
import tasksReducer, {State as TasksState} from './tasks';
import homeReducer, {State as HomeState} from './home';

export type RootStore = {
  projects: ProjectsState;
  lists: ListsState;
  tasks: TasksState;
  home: HomeState;
};

const reducers = () =>
  combineReducers<RootStore>({
    projects: projectsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
    home: homeReducer,
  });

export default reducers;
