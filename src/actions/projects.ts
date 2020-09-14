import {Dispatch, Action} from 'redux';
import {GetProjects, GetRepositories} from '@/apiClient';
import {Project} from '@/entities/project';
import {Repository} from '~src/entities/repository';

export const RequestGetProjects = 'RequestGetProjects' as const;
export const ReceiveGetProjects = 'ReceiveGetProjects' as const;
export const ErrorGetProjects = 'ErrorGetProjects' as const;
export const ClearGetError = 'ClearGetError' as const;
export const RequestGetRepositories = 'RequestGetRepositories' as const;
export const ReceiveGetRepositories = 'ReceiveGetRepositories' as const;

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
    GetProjects()
      .then((data) => {
        dispatch(receiveGetProjects(data));
      })
      .catch((err) => {
        switch (err.response.status) {
          // JWT middleware of Echo return 400 when Authorization header is not provided.
          // https://echo.labstack.com/middleware/jwt
          case 401:
          case 400:
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

export const requestGetRepositories = () => ({
  type: RequestGetRepositories,
});

export const receiveGetRepositories = (repositories: Array<Repository>) => ({
  type: ReceiveGetRepositories,
  payload: repositories,
});

export const getRepositories = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(requestGetRepositories());
    return GetRepositories().then((repositories) => {
      dispatch(receiveGetRepositories(repositories));
    });
  };
};

type Actions = ReturnType<
  | typeof requestGetProjects
  | typeof receiveGetProjects
  | typeof errorGetProjects
  | typeof clearGetError
  | typeof requestGetRepositories
  | typeof receiveGetRepositories
>;

export default Actions;
