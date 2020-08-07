import {Component, OnInit} from '@angular/core';
import {TodoService} from '../service/todo.service';
import {TodoElement} from '../interface/todo-element';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalTitle = '';
  title = 'Vectra Todo App';
  todos: TodoElement[] = [];
  todoForm: FormGroup;
  adding = true;
  statuses = ['New', 'In Progress', 'Blocked', 'Completed'];

  constructor(private todoService: TodoService, private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.showTodos().then(r => console.log('Todos loaded  : ' +
      this.todos));
    this.todoForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      due_date: [''],
      status: ['']
    });
  }

  async showTodos() {
    await this.todoService.getTodos()
      .subscribe((data: TodoElement[]) => {
        this.todos = data;
      });
  }

  openAddModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.todoForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      due_date: [''],
      status: ['']
    });
    this.modalTitle = 'Add Todo Modal';
    this.adding = true;

  }

  openEditModal(targetModal, todo) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.todoForm.patchValue({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      due_date: todo.due_date,
      status: todo.status
    });
    this.modalTitle = 'Edit Todo Modal';
    this.adding = false;
  }

  openDeleteModal(targetModal, todo) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    console.log(todo.title + ' Todo deleted');
  }

  async onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.todoForm.getRawValue());
    const data = this.todoForm.getRawValue();
    if (this.adding) {
      await this.todoService.create(data);
    } else {
      await this.todoService.update(data.id, data);
    }
  

  }

  async onDelete() {
    this.modalService.dismissAll();
    const data = this.todoForm.getRawValue();
    await this.todoService.delete(data.id);
  }
}
