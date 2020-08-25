import {combineReducers} from 'redux';

import projectsReducer, {State as ProjectsState} from './projects';

export type RootStore = {
  projects: ProjectsState;
};

const reducers = () =>
  combineReducers<RootStore>({
    projects: projectsReducer,
  });

export default reducers;
