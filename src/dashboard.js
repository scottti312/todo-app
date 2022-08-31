import { createDemo, todo, project } from './logic.js';

export function dashboard() {
  let content = document.createElement('div');
  let projectsContainer = document.createElement('div');
  let projects = document.createElement('ul');
  let todosContainer = document.createElement('div');
  let todos = document.createElement('ul');
  // let { demoAccount, inbox } = createDemo();
  // let currentProject = inbox;
  // localStorage.clear();
  let demoAccount = JSON.parse(localStorage.getItem('user'));
  console.log(demoAccount);
  let currentProject = demoAccount.projects[0];
  let addProject = addNewProject(projects, demoAccount, todos, currentProject);
  projectsContainer.className = 'projects-container';
  projects.className = 'projects';
  todosContainer.className = 'todos-container';
  todos.className = 'todos';

  displayTodos(currentProject, todos, demoAccount);
  displayProjects(demoAccount, projects);
  projects.append(addProject);
  todosContainer.append(todos);
  projectsContainer.append(projects);
  content.className = 'dashboard';
  content.append(projectsContainer);
  content.append(todosContainer);
  localStorage.setItem('user', JSON.stringify(demoAccount));


  openTodo(todos, demoAccount, currentProject);
  let currentProjectIndex = switchProject(projects, todos, demoAccount, currentProject);
  currentProject = demoAccount.projects[currentProjectIndex];

  return content;
}

function displayTodos(currentProject, todos, currentAccount) {
  for (const todo of currentProject.todos) {
    let todoDisplay = document.createElement('li');
    todoDisplay.innerHTML = todo.title;
    todos.append(todoDisplay);
  }
  todos.append(addNewTodo(currentProject, todos, currentAccount))
}

function displayProjects(currentAccount, sidebar) {
  for (const project of currentAccount.projects) {
    let projectDisplay = document.createElement('li');
    projectDisplay.innerHTML = project.title;
    sidebar.append(projectDisplay);
  }
}

function addNewTodo(currentProject, todos, currentAccount) {
  let addTodo = document.createElement('button');
  addTodo.className = 'add-todo';
  addTodo.innerHTML = 'Add new task';
  addTodo.addEventListener('click', () => {
    todos.removeChild(addTodo);
    let createTodoContainer = document.createElement('div');
    let todoTitleLabel = document.createElement('label');
    let todoInputTitle = document.createElement('input');
    let todoDescriptionLabel = document.createElement('label');
    let todoInputDescription = document.createElement('textarea');
    let todoSubmit = document.createElement('button');
    let todoDisplay = document.createElement('li');

    todoTitleLabel.innerHTML = 'Title';
    todoTitleLabel.setAttribute('for', 'todo-title-input');
    todoDescriptionLabel.innerHTML = 'Description';
    todoDescriptionLabel.setAttribute('for', 'todo-description-input');
    todoDescriptionLabel.for = 'todo-description-input';
    createTodoContainer.className = 'create-todo-form';
    todoInputTitle.id = 'todo-title-input';
    todoInputDescription.id = 'todo-description-input';
    todoInputDescription.setAttribute('column', 80);
    todoInputDescription.setAttribute('row', 3);
    todoSubmit.innerHTML = 'Submit';
    todoSubmit.id = 'submit';

    todoSubmit.addEventListener('click', () => {
      if (todoInputTitle.value != '') {
        let newTodoTitle = todoInputTitle.value;
        let newTodoDescription = todoInputDescription.value;
        if (todoInputDescription.value == '') {
          newTodoDescription = 'Empty';
        }
        let newTodo = todo(newTodoTitle, newTodoDescription);
        currentProject.todos.push(newTodo);
        localStorage.setItem('user', JSON.stringify(currentAccount));
        todoDisplay.innerHTML = newTodo.title;
        todos.append(todoDisplay);
      }
      todos.removeChild(createTodoContainer);
      todos.removeChild(todoSubmit);
      todos.appendChild(addTodo);
      // Update openTodo with new todo entry
      openTodo(todos, currentAccount, currentProject);
    });
    createTodoContainer.append(todoTitleLabel, todoInputTitle, todoDescriptionLabel, todoInputDescription);
    todos.append(createTodoContainer);
    todos.append(todoSubmit);
    todoInputTitle.addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
    todoInputDescription.addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
  })
  return addTodo;
}

function addNewProject(projects, demoAccount, todos, currentProject) {
  let addProject = document.createElement('button');
  addProject.innerHTML = 'Add new project';
  addProject.addEventListener('click', () => {
    projects.removeChild(addProject);
    let projectInput = document.createElement('input');
    let projectSubmit = document.createElement('button');
    let projectDisplay = document.createElement('li');
    projectSubmit.innerHTML = 'Submit';
    projectSubmit.id = 'submit';
    projectSubmit.addEventListener('click', () => {
      let newProject = project(projectInput.value);
      demoAccount.projects.push(newProject);
      localStorage.setItem('user', JSON.stringify(demoAccount));
      projectDisplay.innerHTML = newProject.title;
      projects.append(projectDisplay);
      projects.append(addProject);
      projects.removeChild(projectInput);
      projects.removeChild(projectSubmit);
      projects.appendChild(addProject);

      switchProject(projects, todos, demoAccount, currentProject);
    });
    projects.append(projectInput);
    projects.append(projectSubmit);
    projectInput.addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
  });
  return addProject;
}

function switchProject(projects, todos, currentAccount) {
  // Click on projects to switch currentProject
  var projectNodes = Array.from(projects.children);
  for (const element of projects.querySelectorAll('li')) {
    element.addEventListener('click', function(e) {
      let index = projectNodes.indexOf(e.target);
      while(todos.firstChild) {
        todos.removeChild(todos.firstChild);
      }
      let currentProject = currentAccount.projects[index];
      displayTodos(currentProject, todos, currentAccount);
      openTodo(todos, currentAccount, currentProject);
      return index;
    });
  }
}

function openTodo(todos, currentAccount, currentProject) {
  var nodes = Array.from(todos.children);
  // Click on todos to "open" them
  for (const element of todos.querySelectorAll('li')) {
    element.addEventListener('click', function(e) {
      todos.removeChild(element);
      let title = document.createElement('textarea'); 
      let index = nodes.indexOf(e.target);
      let todoContainer = document.createElement('div');
      let description = document.createElement('textarea');
      let doneButton = document.createElement('button');
      let removeButton = document.createElement('button');
      let resultTodo = document.createElement('li');
      let buttonsContainer = document.createElement('div');
      
      description.setAttribute('column', 80);
      description.setAttribute('row', 5);
      description.id = 'todo-description';
      todoContainer.className = 'todo-section';
      title.id = 'todo-title';
      title.setAttribute('column', 80);
      title.setAttribute('row', 1);
      title.value = element.innerText;
      description.value = currentProject.todos[index].description;

      title.addEventListener('keypress', function(e) {
        if (e.key == 'Enter') {
          e.preventDefault();
          doneButton.click();
        }
      });

      buttonsContainer.append(removeButton, doneButton);
      todoContainer.append(title, description, buttonsContainer);
      removeButton.innerText = 'Delete task';
      removeButton.addEventListener('click', () => {
        currentProject.todos.splice(index, 1);
        localStorage.setItem('user', JSON.stringify(currentAccount));
        todos.removeChild(todoContainer);
      });

      doneButton.innerText = 'Done';
      doneButton.addEventListener('click', () => {
        if (title.value == '') {
          todos.removeChild(todoContainer);
          todos.insertBefore(element, todos.children[index]);
        }
        resultTodo.innerHTML = title.value;
        currentProject.todos[index].title = title.value;
        currentProject.todos[index].description = description.value;
        localStorage.setItem('user', JSON.stringify(currentAccount));
        todos.removeChild(todoContainer);
        todos.insertBefore(resultTodo, todos.children[index]);
        openTodo(todos, currentAccount, currentProject);
      });
      todos.insertBefore(todoContainer, todos.children[index]);
    });
  }
}