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
import NewActions, {
  RequestCreateList,
  ReceiveCreateList,
  ErrorCreateList,
  ClearCreateError,
} from '@/actions/projects/lists/new';
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

const reducer: Reducer<State, Actions | NewActions> = (
  state: State = initState,
  action: Actions | NewActions,
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
    case RequestCreateList:
      return {
        ...state,
        errors: null,
      };
    case ReceiveGetLists:
      return {
        ...state,
        loading: false,
        errors: null,
        lists: action.payload,
      };
    case ReceiveCreateList:
      return {
        ...state,
        errors: null,
      };
    case ErrorGetLists:
    case ErrorCreateList:
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
