import {Action, Dispatch} from 'redux';
import {GetLists, MoveTask, HideList, DisplayList} from '@/apiClient';

import {List} from '@/entities/list';

export const RequestGetLists = 'RequestGetLists' as const;
export const ReceiveGetLists = 'ReceiveGetLists' as const;
export const ReceiveNoneList = 'ReceiveNoneList' as const;
export const ErrorGetLists = 'ErrorGetLists' as const;
export const ClearGetError = 'ClearGetError' as const;
export const RequestMoveTask = 'RequestMoveTask' as const;
export const RequestHideList = 'RequestHideList' as const;
export const ReceiveHideList = 'ReceiveHideList' as const;
export const RequestDisplayList = 'RequestDisplayList' as const;
export const ReceiveDisplayList = 'ReceiveDisplayList' as const;

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

export const requestHideList = () => ({
  type: RequestHideList,
});

export const receiveHideList = () => ({
  type: ReceiveHideList,
});

export const hideList = (projectID: number, listID: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestHideList());
    HideList(projectID, listID)
      .then(({lists, none}) => {
        dispatch(receiveHideList());
        dispatch(receiveGetLists(lists));
        dispatch(receiveNoneList(none));
      })
      .catch((err) => {
        dispatch(errorGetLists(err));
      });
  };
};

export const requestDisplayList = () => ({
  type: RequestDisplayList,
});

export const receiveDisplayList = () => ({
  type: ReceiveDisplayList,
});

export const displayList = (projectID: number, listID: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestDisplayList());
    DisplayList(projectID, listID)
      .then(({lists, none}) => {
        dispatch(receiveDisplayList());
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
  | typeof requestHideList
  | typeof receiveHideList
  | typeof requestDisplayList
  | typeof receiveDisplayList
>;

export default Actions;
