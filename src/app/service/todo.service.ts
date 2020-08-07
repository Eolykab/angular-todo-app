import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoElement} from '../interface/todo-element';

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

  create(data) {
    return this.http.post(this.baseUrl, JSON.stringify(data));
  }

  update(id, data) {
    return this.http.put(`${(this.baseUrl)}/${id}`, JSON.stringify(data));
  }

  delete(id) {
    return this.http.delete(`${(this.baseUrl)}/${id}`);
  }
}
