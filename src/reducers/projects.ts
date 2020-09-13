import {Reducer} from 'redux';

import Actions, {
  RequestGetProjects,
  ReceiveGetProjects,
  ErrorGetProjects,
  ClearGetError,
  RequestGetRepositories,
  ReceiveGetRepositories,
} from '@/actions/projects';
import NewActions, {
  RequestCreateProject,
  ReceiveCreateProject,
  ErrorCreateProject,
  ClearCreateError,
} from '@/actions/projects/new';
import {Project} from '@/entities/project';
import {Repository} from '~src/entities/repository';

export type State = {
  loading: boolean;
  errors: Error | null;
  projects: Array<Project>;
  repositories: Array<Repository>;
};

const initState: State = {
  loading: false,
  errors: null,
  projects: [],
  repositories: [],
};

const reducer: Reducer<State, Actions | NewActions> = (
  state: State = initState,
  action: Actions | NewActions,
): State => {
  switch (action.type) {
    case RequestGetProjects:
    case RequestGetRepositories:
      return {
        ...state,
        loading: true,
      };
    case RequestCreateProject:
      return {
        ...state,
        errors: null,
      };
    case ReceiveGetProjects:
      return {
        ...state,
        loading: false,
        errors: null,
        projects: action.payload,
      };
    case ReceiveGetRepositories:
      return {
        ...state,
        loading: false,
        errors: null,
        repositories: action.payload,
      };
    case ReceiveCreateProject:
      return {
        ...state,
        errors: null,
      };
    case ErrorGetProjects:
    case ErrorCreateProject:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case ClearGetError:
    case ClearCreateError:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
};
export default reducer;
