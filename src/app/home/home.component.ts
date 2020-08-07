import {Component, OnInit} from '@angular/core';
import {TodoService} from '../service/todo.service';
import {TodoElement} from '../interface/todo-element';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Vectra Todo App';
  todos: TodoElement[] = [];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.showTodos().then(r => console.log('Todos loaded  : ' +
      this.todos));
  }

  async showTodos() {
    await this.todoService.getTodos()
      .subscribe((data: TodoElement[]) => {
        this.todos = data;
      });
  }

  onTodoClick($event: MouseEvent) {
    console.log('Clicked');
  }
}
