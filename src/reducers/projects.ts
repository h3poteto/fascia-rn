import {Reducer} from 'redux';

import Actions, {
  RequestGetProjects,
  ReceiveGetProjects,
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
        projects: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
