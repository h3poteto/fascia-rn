import {Reducer} from 'redux';

import Actions, {
  RequestGetProjects,
  ReceiveGetProjects,
  ErrorGetProjects,
  ClearGetError,
} from '@/actions/projects';
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

const reducer: Reducer<State, Actions> = (
  state: State = initState,
  action: Actions,
): State => {
  switch (action.type) {
    case RequestGetProjects:
      return {
        ...state,
        loading: true,
      };
    case ReceiveGetProjects:
      return {
        ...state,
        loading: false,
        errors: null,
        projects: action.payload,
      };
    case ErrorGetProjects:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case ClearGetError:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
export default reducer;
