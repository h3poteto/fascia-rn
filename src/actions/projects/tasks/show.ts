import {Action, Dispatch} from 'redux';

import {GetTask} from '@/apiClient';
import {Task} from '@/entities/task';

export const RequestGetTask = 'RequestGetTask' as const;
export const ReceiveGetTask = 'ReceiveGetTask' as const;
export const ErrorGetTask = 'ErrorGetTask' as const;
export const ClearGetError = 'ClearGetError' as const;

export const requestGetTask = () => ({
  type: RequestGetTask,
});

export const receiveGetTask = (task: Task) => ({
  type: ReceiveGetTask,
  payload: task,
});

export const errorGetTask = (err: Error) => ({
  type: ErrorGetTask,
  payload: err,
});

export const clearGetError = () => ({
  type: ClearGetError,
});

export const getTask = (
  navigation: any,
  projectID: number,
  listID: number,
  taskID: number,
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestGetTask());
    GetTask(projectID, listID, taskID)
      .then((task) => {
        dispatch(receiveGetTask(task));
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            dispatch(clearGetError());
            navigation.navigate('Login');
            return;
          default:
            dispatch(errorGetTask(err));
            return;
        }
      });
  };
};

type Actions = ReturnType<
  | typeof requestGetTask
  | typeof receiveGetTask
  | typeof errorGetTask
  | typeof clearGetError
>;

export default Actions;
