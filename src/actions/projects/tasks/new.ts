import axios from 'axios';

import {getLists} from '@/actions/projects/lists';
import {Task, ServerTask, converter} from '@/entities/task';

export const RequestCreateTask = 'RequestCreateTask' as const;
export const ReceiveCreateTask = 'ReceiveCreateTask' as const;

export const requestCreateTask = () => ({
  type: RequestCreateTask,
});

export const receiveCreateTask = (task: Task) => ({
  type: ReceiveCreateTask,
  payload: task,
});

export const createTask = (
  navigation: any,
  projectID: number,
  listID: number,
  params: any,
) => {
  return async (dispatch: Function) => {
    dispatch(requestCreateTask());
    return axios
      .post<ServerTask>(
        `https://fascia.io/api/projects/${projectID}/lists/${listID}/tasks`,
        params,
      )
      .then((res) => {
        const data = converter(res.data);
        dispatch(receiveCreateTask(data));
        dispatch(getLists(projectID));
        navigation.goBack();
      });
  };
};

type Actions = ReturnType<typeof requestCreateTask | typeof receiveCreateTask>;

export default Actions;
