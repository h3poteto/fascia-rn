export type TasksParam = {
  Show: {projectID: number; listID: number; taskID: number; title: string};
  Edit: {listID: number; taskID: number; title: string};
};
