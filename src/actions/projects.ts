import {Dispatch, Action} from 'redux';
import axios from 'axios';
import {ServerProject, Project, converter} from '../entities/project';

export const RequestGetProjects = 'RequestGetProjects' as const;
export const ReceiveGetProjects = 'ReceiveGetProjects' as const;

export const requestGetProjects = () => ({
  type: RequestGetProjects,
});

export const receiveGetProjects = (projects: Array<Project>) => {
  return {
    type: ReceiveGetProjects,
    payload: projects,
  };
};

export const getProjects = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestGetProjects());
    axios
      .get<Array<ServerProject>>('https://fascia.io/api/projects')
      .then((res) => {
        const data: Array<Project> = res.data.map((p) => converter(p));
        dispatch(receiveGetProjects(data));
      });
  };
};

type Actions = ReturnType<
  typeof requestGetProjects | typeof receiveGetProjects
>;

export default Actions;
