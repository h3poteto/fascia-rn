import {CreateTask} from '@/apiClient';
import {getLists} from '@/actions/projects/lists';
import {Task} from '@/entities/task';

export const RequestCreateTask = 'RequestCreateTask' as const;
export const ReceiveCreateTask = 'ReceiveCreateTask' as const;
export const ErrorCreateTask = 'ErrorCreateTask' as const;
export const ClearCreateError = 'ClearCreateError' as const;

export const requestCreateTask = () => ({
  type: RequestCreateTask,
});

export const receiveCreateTask = (task: Task) => ({
  type: ReceiveCreateTask,
  payload: task,
});

export const errorCreateTask = (err: Error) => ({
  type: ErrorCreateTask,
  payload: err,
});

export const clearCreateError = () => ({
  type: ClearCreateError,
});

export const createTask = (
  navigation: any,
  projectID: number,
  listID: number,
  params: any,
) => {
  return async (dispatch: Function) => {
    dispatch(requestCreateTask());
    return CreateTask(projectID, listID, params)
      .then((task) => {
        dispatch(receiveCreateTask(task));
        dispatch(getLists(navigation, projectID));
        navigation.goBack();
      })
      .catch((err) => {
        dispatch(errorCreateTask(err));
      });
  };
};

type Actions = ReturnType<
  | typeof requestCreateTask
  | typeof receiveCreateTask
  | typeof errorCreateTask
  | typeof clearCreateError
>;

export default Actions;
