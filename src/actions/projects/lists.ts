import {Action, Dispatch} from 'redux';
import {GetLists, MoveTask} from '@/apiClient';

import {List} from '@/entities/list';

export const RequestGetLists = 'RequestGetLists' as const;
export const ReceiveGetLists = 'ReceiveGetLists' as const;
export const ReceiveNoneList = 'ReceiveNoneList' as const;
export const ErrorGetLists = 'ErrorGetLists' as const;
export const ClearGetError = 'ClearGetError' as const;
export const RequestMoveTask = 'RequestMoveTask' as const;

export const requestGetLists = () => ({
  type: RequestGetLists,
});

export const receiveGetLists = (lists: Array<List>) => ({
  type: ReceiveGetLists,
  payload: lists,
});

export const receiveNoneList = (list: List) => ({
  type: ReceiveNoneList,
  payload: list,
});

export const errorGetLists = (err: Error) => ({
  type: ErrorGetLists,
  payload: err,
});

export const clearGetError = () => ({
  type: ClearGetError,
});

export const getLists = (navigation: any, projectID: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestGetLists());
    GetLists(projectID)
      .then(({lists, none}) => {
        dispatch(receiveGetLists(lists));
        dispatch(receiveNoneList(none));
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            dispatch(clearGetError());
            navigation.navigate('Login');
            return;
          default:
            dispatch(errorGetLists(err));
            return;
        }
      });
  };
};

export const requestMoveTask = () => ({
  type: RequestMoveTask,
});

export const moveTask = (
  projectID: number,
  fromListID: number,
  toListID: number,
  taskID: number,
  prevToTaskID: number | null,
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestMoveTask());
    MoveTask(projectID, fromListID, toListID, taskID, prevToTaskID)
      .then(({lists, none}) => {
        dispatch(receiveGetLists(lists));
        dispatch(receiveNoneList(none));
      })
      .catch((err) => {
        dispatch(errorGetLists(err));
      });
  };
};

type Actions = ReturnType<
  | typeof requestGetLists
  | typeof receiveGetLists
  | typeof receiveNoneList
  | typeof errorGetLists
  | typeof clearGetError
  | typeof requestMoveTask
>;

export default Actions;
