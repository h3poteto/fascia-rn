export type ServerTask = {
  ID: number;
  ListID: number;
  ProjectID: number;
  UserID: number;
  IssueNumber: number;
  Title: string;
  Description: string;
  HTMLURL: string;
  PullRequest: boolean;
};

export type Task = {
  id: number;
  list_id: number;
  project_id: number;
  user_id: number;
  issue_number: number;
  title: string;
  description: string;
  html_url: string;
  pull_request: boolean;
};

export const converter = (t: ServerTask): Task => ({
  id: t.ID,
  list_id: t.ListID,
  project_id: t.ProjectID,
  user_id: t.UserID,
  issue_number: t.IssueNumber,
  title: t.Title,
  description: t.Description,
  html_url: t.HTMLURL,
  pull_request: t.PullRequest,
});
