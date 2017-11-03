import { Task } from './task';
import { User } from './user';
import { Milestone } from './milestone';

export class Project {

  id: number;
  title: string;
  description: string;
  notice: string;
  tasks: Task[];
  milestones: Milestone[];
}
