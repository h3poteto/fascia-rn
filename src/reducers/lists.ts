import {Reducer} from 'redux';

import Actions, {
  RequestGetLists,
  ReceiveGetLists,
  ErrorGetLists,
  ClearGetError,
  RequestMoveTask,
  RequestHideList,
  RequestDisplayList,
} from '@/actions/projects/lists';
import {List} from '@/entities/list';

export type State = {
  loading: boolean;
  errors: Error | null;
  lists: Array<List>;
  noneList: List | null;
};

const initState: State = {
  loading: false,
  errors: null,
  lists: [],
  noneList: null,
};

const reducer: Reducer<State, Actions> = (
  state: State = initState,
  action: Actions,
): State => {
  switch (action.type) {
    case RequestGetLists:
    case RequestMoveTask:
    case RequestHideList:
    case RequestDisplayList:
      return {
        ...state,
        loading: true,
      };
    case ReceiveGetLists:
      return {
        ...state,
        loading: false,
        errors: null,
        lists: action.payload,
      };
    case ErrorGetLists:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case ClearGetError:
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
