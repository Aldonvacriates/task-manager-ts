export interface Task {
    id: string
    title: string
    description?: string;
    completed?: boolean;
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "EDIT_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK_COMPLETE"; payload: string }