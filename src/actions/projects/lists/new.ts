import {List} from '@/entities/list';
import {CreateListParams, CreateList} from '@/apiClient';
import {getLists} from '../lists';

export const RequestCreateList = 'RequestCreateList' as const;
export const ReceiveCreateList = 'ReceiveCreateList' as const;
export const ErrorCreateList = 'ErrorCreateList' as const;
export const ClearCreateError = 'ClearCreateError' as const;

export const requestCreateList = () => ({
  type: RequestCreateList,
});

export const receiveCreateList = (list: List) => ({
  type: ReceiveCreateList,
  payload: list,
});

export const errorCreateList = (err: Error) => ({
  type: ErrorCreateList,
  payload: err,
});

export const clearCreateError = () => ({
  type: ClearCreateError,
});

export const createList = (
  navigation: any,
  projectID: number,
  params: CreateListParams,
) => {
  return async (dispatch: Function) => {
    dispatch(requestCreateList());
    return CreateList(projectID, params)
      .then((list) => {
        dispatch(receiveCreateList(list));
        dispatch(getLists(navigation, projectID));
        navigation.goBack();
      })
      .catch((err) => {
        dispatch(errorCreateList(err));
      });
  };
};

type Actions = ReturnType<
  | typeof requestCreateList
  | typeof receiveCreateList
  | typeof errorCreateList
  | typeof clearCreateError
>;

export default Actions;
