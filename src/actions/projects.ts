import {Dispatch, Action} from 'redux';
import axios from 'axios';
import {ServerProject, Project, converter} from '@/entities/project';

export const RequestGetProjects = 'RequestGetProjects' as const;
export const ReceiveGetProjects = 'ReceiveGetProjects' as const;
export const ErrorGetProjects = 'ErrorGetProjects' as const;
export const ClearGetError = 'ClearGetError' as const;

export const requestGetProjects = () => ({
  type: RequestGetProjects,
});

export const receiveGetProjects = (projects: Array<Project>) => {
  return {
    type: ReceiveGetProjects,
    payload: projects,
  };
};

export const errorGetProjects = (err: Error) => ({
  type: ErrorGetProjects,
  payload: err,
});

export const clearGetError = () => ({
  type: ClearGetError,
});

export const getProjects = (navigation: any) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch(requestGetProjects());
    axios
      .get<Array<ServerProject>>('https://fascia.io/api/projects')
      .then((res) => {
        const data: Array<Project> = res.data.map((p) => converter(p));
        dispatch(receiveGetProjects(data));
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            dispatch(clearGetError());
            navigation.navigate('Login');
            return;
          default:
            dispatch(errorGetProjects(err));
            return;
        }
      });
  };
};

type Actions = ReturnType<
  | typeof requestGetProjects
  | typeof receiveGetProjects
  | typeof errorGetProjects
  | typeof clearGetError
>;

export default Actions;
