import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      {
        id: 0, title: "zProjekt AA", descr: "Beschreibung AA", notes: "Notizen", tasks: [
          {
            id: 0,
            title: "Aufgabe 1",
            descr: "Aufgabenbeschreibung 1",
            notes: "Aufgaben notizen",
            user: [
            {
              id: 0,
              name: "Nadine",
              email: "nadine@nadine.com",
              image: "string"
            }
            ],
            deadline: new Date('2017/11/11'),
            milestone: false
          },
          {
            id: 1,
            title: "Aufgabe 2",
            descr: "Aufgabenbeschreibung 2",
            notes: "Aufgaben notizen",
            user: [
            {
              id: 0,
              name: "Flo",
              email: "flo@flo.com",
              image: "string"
            }
            ],
            deadline: new Date('2017/12/12'),
            milestone: true
          }
        ],
        milestones: [
        {
          id: 0,
          title: "Meilenstein 1",
          deadline: new Date('2017/11/11')
        },
        {
          id: 1,
          title: "Meilenstein 2",
          deadline: new Date('2017/12/12')
        }
        ]
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
      },
      {
        id: 8, title: "Projekt G", descr: "Beschreibung G"
      },
      {
        id: 9, title: "Projekt G", descr: "Beschreibung G"
      }
    ];
    return {projects};
  }
}
