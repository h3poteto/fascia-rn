import axios from 'axios';
import {Action, Dispatch} from 'redux';

import {Task, ServerTask, converter} from '@/entities/task';

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
    axios
      .get<ServerTask>(
        `https://fascia.io/api/projects/${projectID}/lists/${listID}/tasks/${taskID}`,
      )
      .then((res) => {
        const data = converter(res.data);
        dispatch(receiveGetTask(data));
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
