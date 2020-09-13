import {get, post, patch} from './base';

import {
  ServerProject,
  Project,
  converter as projectConverter,
} from '@/entities/project';
import {List, Lists, converter as listConverter} from '@/entities/list';
import {Task, ServerTask, converter as taskConverter} from '@/entities/task';
import {Repository} from '@/entities/repository';

const BaseURL = 'https://fascia.io';

export const UpdateSession = async (): Promise<{}> => {
  return patch<{}>(`${BaseURL}/session`);
};

export const GetProjects = async (): Promise<Array<Project>> => {
  return get<Array<ServerProject>>(`${BaseURL}/api/projects`).then((res) => {
    return res.data.map((p) => projectConverter(p));
  });
};

export const GetRepositories = async (): Promise<Array<Repository>> => {
  return get<Array<Repository>>(`${BaseURL}/api/github/repositories`).then(
    (res) => {
      return res.data;
    },
  );
};

export type CreateProjectParams = {
  title: string;
  description: string;
  repository_id?: number;
};

export const CreateProject = async (
  params: CreateProjectParams,
): Promise<Project> => {
  return post<ServerProject>(`${BaseURL}/api/projects`, params).then((res) => {
    return projectConverter(res.data);
  });
};

export const GetLists = async (
  projectID: number,
): Promise<{lists: Array<List>; none: List}> => {
  return get<Lists>(`${BaseURL}/api/projects/${projectID}/lists`).then(
    (res) => {
      const data: Array<List> = res.data.Lists.map((l) => listConverter(l));
      const none = listConverter(res.data.NoneList);
      return {lists: data, none: none};
    },
  );
};

export const MoveTask = async (
  projectID: number,
  fromListID: number,
  toListID: number,
  taskID: number,
  prevToTaskID: number | null,
): Promise<{lists: Array<List>; none: List}> => {
  return post<Lists>(
    `${BaseURL}/api/projects/${projectID}/lists/${fromListID}/tasks/${taskID}/move_task`,
    {
      to_list_id: toListID,
      prev_to_task_id: prevToTaskID,
    },
  ).then((res) => {
    const data: Array<List> = res.data.Lists.map((l) => listConverter(l));
    const none = listConverter(res.data.NoneList);
    return {lists: data, none: none};
  });
};

export const GetTask = async (
  projectID: number,
  listID: number,
  taskID: number,
): Promise<Task> => {
  return get<ServerTask>(
    `${BaseURL}/api/projects/${projectID}/lists/${listID}/tasks/${taskID}`,
  ).then((res) => {
    return taskConverter(res.data);
  });
};

export const CreateTask = async (
  projectID: number,
  listID: number,
  params: any,
): Promise<Task> => {
  return post<ServerTask>(
    `${BaseURL}/api/projects/${projectID}/lists/${listID}/tasks`,
    params,
  ).then((res) => {
    return taskConverter(res.data);
  });
};

export const UpdateTask = async (
  projectID: number,
  listID: number,
  taskID: number,
  params: any,
): Promise<Task> => {
  return patch<ServerTask>(
    `${BaseURL}/api/projects/${projectID}/lists/${listID}/tasks/${taskID}`,
    params,
  ).then((res) => {
    return taskConverter(res.data);
  });
};

export const HideList = async (
  projectID: number,
  listID: number,
): Promise<{lists: Array<List>; none: List}> => {
  return patch<Lists>(
    `${BaseURL}/api/projects/${projectID}/lists/${listID}/hide`,
  ).then((res) => {
    // console.log(res);
    const data: Array<List> = res.data.Lists.map((l) => listConverter(l));
    const none = listConverter(res.data.NoneList);
    return {lists: data, none: none};
  });
};

export const DisplayList = async (
  projectID: number,
  listID: number,
): Promise<{lists: Array<List>; none: List}> => {
  return patch<Lists>(
    `${BaseURL}/api/projects/${projectID}/lists/${listID}/display`,
  ).then((res) => {
    // console.log(res);
    const data: Array<List> = res.data.Lists.map((l) => listConverter(l));
    const none = listConverter(res.data.NoneList);
    return {lists: data, none: none};
  });
};
