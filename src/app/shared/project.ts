
export class Project {

  id: number;
  start_date: Date;
  end_date: Date;
  title: string;
  description: string;
  notice: string;

  constructor(id: number, start_date: Date, end_date: Date, title: string, description: string, notice: string) {
    if (id !== -1) {
      this.id = id;
    }
    this.start_date = start_date;
    this.end_date = end_date;
    this.title = title;
    this.description = description;
    this.notice = notice;
  }
}
