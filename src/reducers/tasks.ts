import ShowActions, {
  RequestGetTask,
  ReceiveGetTask,
  ErrorGetTask,
  ClearGetError,
} from '@/actions/projects/tasks/show.ts';
import EditActions, {
  RequestUpdateTask,
  ReceiveUpdateTask,
  ErrorUpdateTask,
  ClearUpdateError,
} from '@/actions/projects/tasks/edit';
import NewActions, {
  RequestCreateTask,
  ReceiveCreateTask,
  ErrorCreateTask,
  ClearCreateError,
} from '@/actions/projects/tasks/new';
import {Task} from '@/entities/task';
import {Reducer} from 'redux';

export type State = {
  loading: boolean;
  errors: Error | null;
  task: Task | null;
};

const initState: State = {
  loading: false,
  errors: null,
  task: null,
};

const reducer: Reducer<State, ShowActions | NewActions | EditActions> = (
  state: State = initState,
  action: ShowActions | NewActions | EditActions,
): State => {
  switch (action.type) {
    case RequestGetTask:
      return {
        ...state,
        loading: true,
      };
    case RequestCreateTask:
    case RequestUpdateTask:
      return {
        ...state,
        errors: null,
      };
    case ReceiveGetTask:
      return {
        ...state,
        loading: false,
        task: action.payload,
      };
    case ReceiveCreateTask:
    case ReceiveUpdateTask:
      return {
        ...state,
        errors: null,
        task: action.payload,
      };
    case ErrorGetTask:
    case ErrorUpdateTask:
    case ErrorCreateTask:
      return {
        ...state,
        errors: action.payload,
      };
    case ClearGetError:
    case ClearCreateError:
    case ClearUpdateError:
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
