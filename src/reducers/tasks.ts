import ShowActions, {
  RequestGetTask,
  ReceiveGetTask,
} from '@/actions/projects/tasks/show.ts';
import EditActions, {
  RequestUpdateTask,
  ReceiveUpdateTask,
} from '@/actions/projects/tasks/edit';
import NewActions, {
  RequestCreateTask,
  ReceiveCreateTask,
} from '@/actions/projects/tasks/new';
import {Task} from '@/entities/task';
import {Reducer} from 'redux';

export type State = {
  loading: boolean;
  task: Task | null;
};

const initState: State = {
  loading: false,
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
      return state;
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
        task: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
