import {UpdateTask} from '@/apiClient';
import {getLists} from '@/actions/projects/lists';
import {Task} from '@/entities/task';

export const RequestUpdateTask = 'RequestUpdateTask' as const;
export const ReceiveUpdateTask = 'ReceiveUpdateTask' as const;
export const ErrorUpdateTask = 'ErrorUpdateTask' as const;
export const ClearUpdateError = 'ClearUpdateError' as const;

export const requestUpdateTask = () => ({
  type: RequestUpdateTask,
});

export const receiveUpdateTask = (task: Task) => ({
  type: ReceiveUpdateTask,
  payload: task,
});

export const errorUpdateTask = (err: Error) => ({
  type: ErrorUpdateTask,
  payload: err,
});

export const clearUpdateError = () => ({
  type: ClearUpdateError,
});

export const updateTask = (
  navigation: any,
  projectID: number,
  listID: number,
  taskID: number,
  params: any,
) => {
  return async (dispatch: Function) => {
    dispatch(requestUpdateTask());
    return UpdateTask(projectID, listID, taskID, params)
      .then((task) => {
        dispatch(receiveUpdateTask(task));
        dispatch(getLists(navigation, projectID));
        navigation.goBack();
      })
      .catch((err) => {
        dispatch(errorUpdateTask(err));
      });
  };
};

type Actions = ReturnType<
  | typeof requestUpdateTask
  | typeof receiveUpdateTask
  | typeof errorUpdateTask
  | typeof clearUpdateError
>;

export default Actions;
