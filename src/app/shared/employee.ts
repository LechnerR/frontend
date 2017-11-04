export class Employee {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    if (id !== -1) {
      this.id = id;
    }
    this.name = name;
    this.email = email;
  }
}
