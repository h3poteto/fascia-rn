import {combineReducers} from 'redux';

import projectsReducer, {State as ProjectsState} from './projects';
import listsReducer, {State as ListsState} from './lists';

export type RootStore = {
  projects: ProjectsState;
  lists: ListsState;
};

const reducers = () =>
  combineReducers<RootStore>({
    projects: projectsReducer,
    lists: listsReducer,
  });

export default reducers;
