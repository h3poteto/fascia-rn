export type ProjectsParam = {
  Index: undefined;
  Lists: {projectID: number; title: string};
  Task: {
    projectID: number;
    listID: number;
    taskID: number;
    title: string;
  };
};
