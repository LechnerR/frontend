import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      {
        id: 0, title: "Projekt AA", descr: "Beschreibung AA"
      },
      {
        id: 1, title: "Projekt A", descr: "Beschreibung A"
      },
      {
        id: 2, title: "Projekt B", descr: "Beschreibung B"
      },
      {
        id: 3, title: "Projekt C", descr: "Beschreibung C"
      },
      {
        id: 4, title: "Projekt D", descr: "Beschreibung D"
      },
      {
        id: 5, title: "Projekt E", descr: "Beschreibung E"
      },
      {
        id: 6, title: "Projekt F", descr: "Beschreibung F"
      },
      {
        id: 7, title: "Projekt G", descr: "Beschreibung G"
      }
    ];
    return {projects};
  }
}
