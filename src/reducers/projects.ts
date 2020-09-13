import {Reducer} from 'redux';

import Actions, {
  RequestGetProjects,
  ReceiveGetProjects,
  ErrorGetProjects,
  ClearGetError,
} from '@/actions/projects';
import NewActions, {
  RequestCreateProject,
  ReceiveCreateProject,
  ErrorCreateProject,
  ClearCreateError,
} from '@/actions/projects/new';
import {Project} from '@/entities/project';

export type State = {
  loading: boolean;
  errors: Error | null;
  projects: Array<Project>;
};

const initState: State = {
  loading: false,
  errors: null,
  projects: [],
};

const reducer: Reducer<State, Actions | NewActions> = (
  state: State = initState,
  action: Actions | NewActions,
): State => {
  switch (action.type) {
    case RequestGetProjects:
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
