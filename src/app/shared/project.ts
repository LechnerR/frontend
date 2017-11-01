import { Task } from './task';
import { User } from './user';
import { Milestone } from './milestone';

export class Project {
  id: number;
  title: string;
  descr: string;
  notes: string;
  tasks: Task[];
}
