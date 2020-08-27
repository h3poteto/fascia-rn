import axios from 'axios';

import {getLists} from '@/actions/projects/lists';
import {Task, ServerTask, converter} from '@/entities/task';

export const RequestUpdateTask = 'RequestUpdateTask' as const;
export const ReceiveUpdateTask = 'ReceiveUpdateTask' as const;

export const requestUpdateTask = () => ({
  type: RequestUpdateTask,
});

export const receiveUpdateTask = (task: Task) => ({
  type: ReceiveUpdateTask,
  payload: task,
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
    return axios
      .patch<ServerTask>(
        `https://fascia.io/api/projects/${projectID}/lists/${listID}/tasks/${taskID}`,
        params,
      )
      .then((res) => {
        const data = converter(res.data);
        dispatch(receiveUpdateTask(data));
        dispatch(getLists(projectID));
        navigation.goBack();
      });
  };
};

type Actions = ReturnType<typeof requestUpdateTask | typeof receiveUpdateTask>;

export default Actions;
