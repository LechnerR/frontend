
export class Project {

  id: number;
  start_date: Date;
  end_date: Date;
  title: string;
  description: string;
  notice: string;

  constructor(start_date: Date, end_date: Date, title: string, desc: string, notice: string) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.title = title;
    this.description = desc;
    this.notice = notice;
  }
}
