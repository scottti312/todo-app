import { remember, createDemo, todo, project, account } from './logic.js';

export function dashboard() {
  let content = document.createElement('div');
  let sidebarContainer = document.createElement('div');
  let sidebar = document.createElement('ul');
  let todosContainer = document.createElement('div');
  let todos = document.createElement('ul');
  let addTodo = document.createElement('button');
  // let { demoAccount, inbox } = createDemo();
  // localStorage.clear();
  let demoAccount = JSON.parse(localStorage.getItem('user'));
  let inbox = demoAccount.projects[0];
  displayTodos(inbox, todos);
  addTodo.innerHTML = 'Add new task';
  addTodo.addEventListener('click', () => {
    todos.removeChild(addTodo);
    let todoInput = document.createElement('input');
    let todoSubmit = document.createElement('button');
    let todoDisplay = document.createElement('li');
    todoSubmit.innerHTML = 'Submit';
    todoSubmit.id = 'submit';
    todoSubmit.addEventListener('click', () => {

      let newTodo = todo(todoInput.value);
      inbox.todos.push(newTodo);
      localStorage.setItem('user', JSON.stringify(demoAccount));

      todoDisplay.innerHTML = newTodo.title;
      todos.append(todoDisplay);
      todos.append(addTodo);
      todos.removeChild(todoInput);
      todos.removeChild(todoSubmit);
      todos.appendChild(addTodo);
    });
    todos.append(todoInput);
    todos.append(todoSubmit);
    todoInput.addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
  });
  displayProjects(demoAccount, sidebar);
  todos.append(addTodo);
  todosContainer.append(todos);
  sidebarContainer.append(sidebar);
  content.className = 'dashboard';
  sidebarContainer.className = 'sidebar';
  todosContainer.className = 'todos';
  content.append(sidebarContainer);
  content.append(todosContainer);
  console.log('final');
  console.log(demoAccount);
  localStorage.setItem('user', JSON.stringify(demoAccount));
  return content;
}

function displayTodos(inbox, todos) {
  for (const todo of inbox.todos) {
    let todoDisplay = document.createElement('li');
    todoDisplay.innerHTML = todo.title;
    todos.append(todoDisplay);
  }
}

function displayProjects(demoAccount, sidebar) {
  for (const project of demoAccount.projects) {
    let projectDisplay = document.createElement('li');
    projectDisplay.innerHTML = project.title;
    sidebar.append(projectDisplay);
  }
}

function addTodo(inbox, todos) {
  let todoDisplay = document.createElement('li');
  let newTodo = todo()
  inbox.addTodo(newTodo);
  todoDisplay.innerHTML = newTodo.title;
  todos.append(todoDisplay);
}
