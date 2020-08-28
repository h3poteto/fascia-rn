import {Action, Dispatch} from 'redux';
import axios from 'axios';

import {List, Lists, converter} from '@/entities/list';

export const RequestGetLists = 'RequestGetLists' as const;
export const ReceiveGetLists = 'ReceiveGetLists' as const;
export const ReceiveNoneList = 'ReceiveNoneList' as const;
export const ErrorGetLists = 'ErrorGetLists' as const;
export const ClearGetError = 'ClearGetError' as const;

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
    axios
      .get<Lists>(`https://fascia.io/api/projects/${projectID}/lists`)
      .then((res) => {
        const data: Array<List> = res.data.Lists.map((l) => converter(l));
        dispatch(receiveGetLists(data));
        const none = converter(res.data.NoneList);
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

type Actions = ReturnType<
  | typeof requestGetLists
  | typeof receiveGetLists
  | typeof receiveNoneList
  | typeof errorGetLists
  | typeof clearGetError
>;

export default Actions;
