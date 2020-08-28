import {Reducer} from 'redux';

import Actions, {
  RequestUpdateSession,
  ReceiveUpdateSession,
} from '@/actions/session';

export type State = {};

const initState: State = {};

const reducer: Reducer<State, Actions> = (
  state: State = initState,
  action: Actions,
): State => {
  switch (action.type) {
    case RequestUpdateSession:
    case ReceiveUpdateSession:
      return state;
    default:
      return state;
  }
};

export default reducer;
