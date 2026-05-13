import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptDate: number | null;
  // Isso remove a necessidade de importar o objeto inteiro, só o tipo
  type: keyof TaskStateModel['config'];
};