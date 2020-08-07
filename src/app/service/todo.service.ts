import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoElement} from '../interface/todo-element';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'http://my-json-server.typicode.com/eolykab/todo-rest/todos/';

  constructor(private http: HttpClient) {
  }

  getTodos() {
    return this.http.get<TodoElement[]>(this.baseUrl);
  }
}
