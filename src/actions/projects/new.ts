import {CreateProject, CreateProjectParams} from '@/apiClient';
import {Project} from '@/entities/project';
import {getProjects} from '../projects';

export const RequestCreateProject = 'RequestCreateProject' as const;
export const ReceiveCreateProject = 'ReceiveCreateProject' as const;
export const ErrorCreateProject = 'ErrorCreateProject' as const;
export const ClearCreateError = 'ClearCreateError' as const;

export const requestCreateProject = () => ({
  type: RequestCreateProject,
});

export const receiveCreateProject = (project: Project) => ({
  type: ReceiveCreateProject,
  payload: project,
});

export const errorCreateProject = (err: Error) => ({
  type: ErrorCreateProject,
  payload: err,
});

export const clearCreateError = () => ({
  type: ClearCreateError,
});

export const createProject = (navigation: any, params: CreateProjectParams) => {
  return async (dispatch: Function) => {
    dispatch(requestCreateProject());
    return CreateProject(params)
      .then((project) => {
        dispatch(receiveCreateProject(project));
        dispatch(getProjects(navigation));
        navigation.goBack();
      })
      .catch((err) => {
        dispatch(errorCreateProject(err));
      });
  };
};

type Actions = ReturnType<
  | typeof requestCreateProject
  | typeof receiveCreateProject
  | typeof errorCreateProject
  | typeof clearCreateError
>;

export default Actions;
