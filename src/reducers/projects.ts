import {Reducer} from 'redux';

import Actions, {
  RequestGetProjects,
  ReceiveGetProjects,
} from '@/actions/projects';
import {Project} from '@/entities/project';

export type State = {
  refreshing: boolean;
  errors: Error | null;
  projects: Array<Project>;
};

const initState: State = {
  refreshing: false,
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
        refreshing: true,
      };
    case ReceiveGetProjects:
      return {
        ...state,
        refreshing: false,
        projects: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
