import {Injectable} from '@angular/core';
import {Todo} from './todo';

@Injectable()
export class TodoDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for todo's
  todos: Todo[] = [];

  constructor() {
  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    localStorage.setItem('todo', JSON.stringify(this.todos));
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = (JSON.parse(localStorage.getItem("todo")))
      .filter(todo => todo.id !== id);
      localStorage.setItem('todo' ,JSON.stringify(this.todos));
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    this.todos = (JSON.parse(localStorage.getItem("todo")))
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    localStorage.setItem('todo',JSON.stringify(this.todos))
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Todo[] {
    if (localStorage.getItem("todo")){
      return(JSON.parse(localStorage.getItem("todo")));
    }
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

}