import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: 'List 1',
      tasks: [
        {
          id: 1,
          desc: 'First task of list 1',
          owner: {
            id: 1,
            name: 'Jack',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: 'First task of list 2',
          owner: {
            id: 2,
            name: 'Tony',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id: 2,
      name: 'List 2',
      tasks: [
        {
          id: 1,
          desc: 'First task of list 2',
          owner: {
            id: 1,
            name: 'Jack',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: 'First task of list 2',
          owner: {
            id: 2,
            name: 'Tony',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
