import { User } from './user';

export class Task {
  id: number;
  title: string;
  descr: string;
  notes: string;
  user: User[];
  deadline: Date;
  milestone: boolean;
}
