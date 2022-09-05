"use strict";
(self["webpackChunktodo_app"] = self["webpackChunktodo_app"] || []).push([["main"],{

/***/ "./src/dashboard.js":
/*!**************************!*\
  !*** ./src/dashboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dashboard": () => (/* binding */ dashboard)
/* harmony export */ });
/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic.js */ "./src/logic.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos.js */ "./src/todos.js");



function dashboard() {
  let content = document.createElement('div');
  let projectsContainer = document.createElement('div');
  let sidebar = document.createElement('ul');
  let todosContainer = document.createElement('div');
  let todos = document.createElement('ul');
  let themeToggle = document.createElement('button');
  themeToggle.innerHTML = 'Toggle Theme'; // let { demoAccount, inbox } = createDemo();
  // let currentProject = inbox;
  // localStorage.clear();

  let demoAccount = JSON.parse(localStorage.getItem('user'));
  console.log(demoAccount);
  let currentProject = demoAccount.projects[0];
  let addProject = (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.addNewProject)(sidebar, demoAccount, todos);
  projectsContainer.className = 'projects-container';
  sidebar.className = 'projects';
  todosContainer.id = 'todos-container';
  todos.id = 'todos';

  for (const todo of currentProject.todos) {
    (0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.displayTodo)(todo, todos, demoAccount, currentProject);
  }

  todos.append((0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.addNewTodo)(currentProject, todos, demoAccount));
  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme; // document.querySelector('html').setAttribute('color-scheme', 'light');

    console.log(document.querySelector('html'));
  });
  projectsContainer.append(themeToggle);

  for (const project of demoAccount.projects) {
    sidebar.append((0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.displayProject)(project, sidebar, demoAccount, todos));
  }

  sidebar.querySelector('li').classList.add('selected-project');
  sidebar.append(addProject);
  todosContainer.append(todos);
  projectsContainer.append(sidebar);
  content.className = 'dashboard';
  content.append(projectsContainer);
  content.append(todosContainer);
  localStorage.setItem('user', JSON.stringify(demoAccount));

  for (const element of todos.querySelectorAll('li')) {
    (0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.openTodo)(element, todos, demoAccount, currentProject);
  }

  for (const element of sidebar.querySelectorAll('li')) {
    (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.switchProject)(element, sidebar, todos, demoAccount);
  }

  let projectTitle = document.createElement('div');
  projectTitle.id = 'inner-project-title';
  projectTitle.innerHTML = sidebar.firstChild.firstChild.innerHTML;
  todos.before(projectTitle);
  return content;
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _dashboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.js */ "./src/dashboard.js");


document.body.append((0,_dashboard_js__WEBPACK_IMPORTED_MODULE_1__.dashboard)());

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "account": () => (/* binding */ account),
/* harmony export */   "createDemo": () => (/* binding */ createDemo),
/* harmony export */   "project": () => (/* binding */ project),
/* harmony export */   "todo": () => (/* binding */ todo)
/* harmony export */ });
function account(name) {
  let projects = [];

  function addProject(project) {
    projects.push(project);
  }

  return {
    addProject,
    projects,
    name
  };
}
function project(title) {
  let todos = [];

  function addTodo(todo) {
    todos.push(todo);
  }

  return {
    account,
    addTodo,
    todos,
    title
  };
}
function todo() {
  let title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Todo Title';
  let description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Todo Description';
  let dueDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
  let completed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (typeof dueDate == 'object') {
    dueDate = [dueDate.getFullYear(), (dueDate.getMonth() + 1).toString().padStart(2, '0'), dueDate.getDate().toString().padStart(2, '0')].join('-');
  }

  return {
    title,
    description,
    dueDate,
    completed
  };
}
function createDemo() {
  const demoAccount = account('Demoman');
  const inbox = project('Inbox');
  const website = project('My website project');
  const myTodo = todo('Example Todo', 'Here is an example description', new Date(), false);
  const completedTodo = todo('Completed Todo', 'Here is an example of a completed todo', new Date(), true);
  const halfFilledTodo = todo('Half Todo', 'Description and no date or completed value', new Date(), false);
  const myTodo1 = todo();
  const websiteTodo = todo('Add divs', 'Add starting divs to my website', new Date(), false);
  const websiteTodo1 = todo('Style divs', 'Style my divs to make them look nice.', new Date(), false);
  demoAccount.addProject(inbox);
  demoAccount.addProject(website);
  inbox.addTodo(completedTodo);
  inbox.addTodo(myTodo);
  inbox.addTodo(myTodo1);
  inbox.addTodo(halfFilledTodo);
  website.addTodo(websiteTodo);
  website.addTodo(websiteTodo1);
  return {
    demoAccount,
    inbox
  };
}

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNewProject": () => (/* binding */ addNewProject),
/* harmony export */   "displayProject": () => (/* binding */ displayProject),
/* harmony export */   "projectMenu": () => (/* binding */ projectMenu),
/* harmony export */   "switchProject": () => (/* binding */ switchProject)
/* harmony export */ });
/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todos.js */ "./src/todos.js");
/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic.js */ "./src/logic.js");


function displayProject(project, sidebar, currentAccount, todos) {
  let projectDisplay = document.createElement('li');
  let projectTitle = document.createElement('div');
  projectTitle.id = 'project-name';
  projectDisplay.className = 'project';
  projectTitle.innerHTML = project.title;
  let menu = document.createElement('i');
  menu.classList.add('fa-solid');
  menu.classList.add('fa-ellipsis');
  menu.classList.add('fa-xl');
  menu.addEventListener('click', e => {
    projectMenu(e, projectDisplay, projectTitle, menu, sidebar, project, currentAccount, todos);
  });
  projectDisplay.addEventListener('mouseover', () => {
    if (!projectDisplay.classList.contains('project-menu')) projectDisplay.append(menu);
  });
  projectDisplay.addEventListener('mouseout', () => {
    if (!projectDisplay.classList.contains('project-menu')) projectDisplay.removeChild(menu);
  });
  projectDisplay.append(projectTitle);
  return projectDisplay;
}
function addNewProject(projects, currentAccount, todos) {
  let addProject = document.createElement('button');
  addProject.innerHTML = 'Add new project';
  addProject.id = 'add-project-button';
  addProject.addEventListener('click', () => {
    projects.removeChild(addProject);
    let projectInput = document.createElement('input');
    let projectSubmit = document.createElement('button');
    projectSubmit.innerHTML = 'Submit';
    projectSubmit.id = 'submit';
    projectSubmit.addEventListener('click', () => {
      if (projectInput.value != '') {
        let newProject = (0,_logic_js__WEBPACK_IMPORTED_MODULE_1__.project)(projectInput.value);
        currentAccount.projects.push(newProject);
        localStorage.setItem('user', JSON.stringify(currentAccount));
        let projectDisplay = displayProject(newProject, projects, currentAccount, todos);
        projects.append(projectDisplay, addProject);
        projects.removeChild(projectInput);
        projects.removeChild(projectSubmit);
        switchProject(projectDisplay, projects, todos, currentAccount);
      }

      projects.removeChild(projectInput);
      projects.removeChild(projectSubmit);
      projects.appendChild(addProject);
    });
    projects.append(projectInput);
    projects.append(projectSubmit);
    projectInput.addEventListener('keypress', function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
  });
  return addProject;
}
function switchProject(projectElement, projects, todos, currentAccount) {
  // Click on projects to switch currentProject
  var projectNodes = Array.from(projects.children);
  projectElement.addEventListener('click', function (e) {
    let target = e.target;

    if (target.tagName == 'DIV') {
      target = projectElement;
    }

    if (target.tagName == 'I') {
      target = projectElement;
    }

    if (target !== this) {
      return;
    }

    for (const project of projects.querySelectorAll('li')) {
      project.classList.remove('selected-project');
    }

    projectElement.classList.add('selected-project');
    let index = projectNodes.indexOf(target);

    while (todos.firstChild) {
      todos.removeChild(todos.firstChild);
    }

    let currentProject = currentAccount.projects[index]; // Add project title to the top of the todo list

    let todosContainer = document.getElementById('todos-container');

    if (todosContainer.contains(document.getElementById('inner-project-title'))) {
      todosContainer.removeChild(todosContainer.firstChild);
    }

    let projectTitle = document.createElement('div');
    projectTitle.id = 'inner-project-title';
    if (projectElement.firstChild.tagName == 'DIV') projectTitle.innerHTML = projectElement.firstChild.innerHTML;
    if (projectElement.firstChild.tagName == 'INPUT') projectTitle.innerHTML = projectElement.firstChild.value;
    todos.before(projectTitle);

    for (const todo of currentProject.todos) {
      (0,_todos_js__WEBPACK_IMPORTED_MODULE_0__.displayTodo)(todo, todos, currentAccount, currentProject);
    }

    for (const element of todos.querySelectorAll('li')) {
      (0,_todos_js__WEBPACK_IMPORTED_MODULE_0__.openTodo)(element, todos, currentAccount, currentProject);
    }

    todos.append((0,_todos_js__WEBPACK_IMPORTED_MODULE_0__.addNewTodo)(currentProject, todos, currentAccount));
    return index;
  });
}
function projectMenu(e, projectDisplay, projectTitle, menu, projects, project, currentAccount, todos) {
  var nodes = Array.from(projects.children);
  let projectTitleInput = document.createElement('input');
  let buttonsContainer = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  let index = nodes.indexOf(e.target.parentElement);
  e.target.parentElement.classList.add('project-menu');
  deleteButton.id = 'delete-project';
  doneButton.id = 'submit-project';
  doneButton.innerHTML = 'Done';
  deleteButton.innerHTML = 'Delete';
  buttonsContainer.className = 'project-buttons';
  projectTitleInput.value = project.title;
  buttonsContainer.append(deleteButton, doneButton);
  projectDisplay.removeChild(projectTitle);
  projectDisplay.removeChild(menu);
  projectDisplay.append(projectTitleInput, buttonsContainer);
  deleteButton.addEventListener('click', e => {
    currentAccount.projects.splice(index, 1);
    projects.removeChild(projectDisplay);
    localStorage.setItem('user', JSON.stringify(currentAccount));
    let i = 0;
    projects.removeChild(projects.lastChild);

    for (const element of projects.querySelectorAll('li')) {
      projects.removeChild(element);
      projects.append(displayProject(currentAccount.projects[i], projects, currentAccount, todos));
      i++;
    }

    for (const element of projects.querySelectorAll('li')) {
      console.log('fuck');
      switchProject(element, projects, todos, currentAccount);
    }

    projects.appendChild(addNewProject(projects, currentAccount, todos));
  });
  doneButton.addEventListener('click', () => {
    if (projectTitleInput.value != '') {
      currentAccount.projects[index].title = projectTitleInput.value;
      localStorage.setItem('user', JSON.stringify(currentAccount));
    }

    let resultProjectDisplay = displayProject(project, projects, currentAccount, todos);
    if (projectDisplay.classList.contains('selected-project')) resultProjectDisplay.classList.add('selected-project');
    projectDisplay.before(resultProjectDisplay);
    switchProject(resultProjectDisplay, projects, todos, currentAccount);
    projects.removeChild(projectDisplay);
  });
  projectTitleInput.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      document.getElementById('submit-project').click();
    }
  });
}

/***/ }),

/***/ "./src/todos.js":
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addNewTodo": () => (/* binding */ addNewTodo),
/* harmony export */   "displayTodo": () => (/* binding */ displayTodo),
/* harmony export */   "openTodo": () => (/* binding */ openTodo)
/* harmony export */ });
/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic.js */ "./src/logic.js");

function displayTodo(todo, todos, currentAccount) {
  let todoDisplay = document.createElement('li');
  let todoTitle = document.createElement('div');
  let checkbox = document.createElement('input');
  let todoDate = document.createElement('div');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.className = 'checkbox';
  todoTitle.id = 'todolist-todo-title';
  todoDate.id = 'todo-date';
  todoTitle.innerHTML = todo.title;
  todoDate.innerHTML = todo.dueDate;
  let currentDate = new Date();
  currentDate = [currentDate.getFullYear(), (currentDate.getMonth() + 1).toString().padStart(2, '0'), currentDate.getDate().toString().padStart(2, '0')].join('-');

  if (todo.dueDate == currentDate) {
    todoDate.style.color = 'var(--todo-date-green)';
  }

  todoDisplay.appendChild(checkbox);
  todoDisplay.appendChild(todoTitle);
  todoDisplay.appendChild(todoDate);

  if (todo.completed) {
    checkbox.checked = true;
    todoDisplay.style.textDecoration = 'line-through';
  }

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      todo.completed = true;
      todoDisplay.style.textDecoration = 'line-through';
      console.log(currentAccount);
      localStorage.setItem('user', JSON.stringify(currentAccount));
    } else {
      todo.completed = false;
      todoDisplay.style.textDecoration = 'none';
      localStorage.setItem('user', JSON.stringify(currentAccount));
    }
  });
  todos.append(todoDisplay);
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
    let todoInputDate = document.createElement('input');
    let todoSubmit = document.createElement('button');
    let todoDisplay = document.createElement('li');
    let todoTitle = document.createElement('div');
    let checkbox = document.createElement('button');
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
    todoInputDate.setAttribute('type', 'date');
    todoSubmit.addEventListener('click', () => {
      if (todoInputTitle.value != '') {
        let newTodoTitle = todoInputTitle.value;
        let newTodoDescription = todoInputDescription.value;
        let newTodoDate = todoInputDate.value;

        if (todoInputDescription.value == '') {
          newTodoDescription = 'Empty';
        }

        let newTodo = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.todo)(newTodoTitle, newTodoDescription, newTodoDate, false);
        currentProject.todos.push(newTodo);
        localStorage.setItem('user', JSON.stringify(currentAccount));
        todoTitle.innerHTML = newTodo.title;
        todoDisplay.append(checkbox, todoTitle); // todos.append(todoDisplay);

        todos.removeChild(createTodoContainer);
        todos.removeChild(todoSubmit);
        displayTodo(newTodo, todos, currentAccount);
        openTodo(todos.lastChild, todos, currentAccount, currentProject);
        todos.appendChild(addTodo);
      } else {
        todos.removeChild(createTodoContainer);
        todos.removeChild(todoSubmit);
        todos.appendChild(addTodo);
      }
    });
    createTodoContainer.append(todoTitleLabel, todoInputTitle, todoDescriptionLabel, todoInputDescription, todoInputDate);
    todos.append(createTodoContainer);
    todos.append(todoSubmit);
    todoInputTitle.addEventListener('keypress', function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
    todoInputDescription.addEventListener('keypress', function (event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
  });
  return addTodo;
}
function openTodo(element, todos, currentAccount, currentProject) {
  var nodes = Array.from(todos.children); // Click on todos to "open" them

  element.addEventListener('click', function (e) {
    let target = e.target;

    if (target.tagName == 'DIV') {
      target = e.target.parentElement;
    } // Children are not affected by event.


    if (target !== this) {
      return;
    }

    element.style.display = 'none';
    let index = nodes.indexOf(target);
    let title = document.createElement('textarea');
    let todoContainer = document.createElement('div');
    let description = document.createElement('textarea');
    let dueDate = document.createElement('input');
    let doneButton = document.createElement('button');
    let removeButton = document.createElement('button');
    let buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'todo-buttons';
    doneButton.id = 'done-task-button';
    removeButton.id = 'remove-task-button';
    dueDate.id = 'due-date';
    description.setAttribute('column', 80);
    description.setAttribute('row', 5);
    description.id = 'todo-description';
    dueDate.setAttribute('type', 'date');
    dueDate.value = currentProject.todos[index].dueDate;
    todoContainer.className = 'todo-section';
    title.id = 'todo-title';
    title.setAttribute('column', 80);
    title.setAttribute('row', 1);
    title.value = element.querySelector('div').innerText;
    description.value = currentProject.todos[index].description;
    title.addEventListener('keypress', function (e) {
      if (e.key == 'Enter') {
        e.preventDefault();
        doneButton.click();
      }
    });
    buttonsContainer.append(removeButton, doneButton);
    todoContainer.append(title, description, dueDate, buttonsContainer);
    removeButton.innerText = 'Delete task'; // Remove a task

    removeButton.addEventListener('click', () => {
      currentProject.todos.splice(index, 1);
      todos.removeChild(todoContainer);
      todos.removeChild(element);
      localStorage.setItem('user', JSON.stringify(currentAccount));
      let i = 0;
      todos.removeChild(todos.lastChild);

      for (const element of todos.querySelectorAll('li')) {
        todos.removeChild(element);
        displayTodo(currentProject.todos[i], todos, currentAccount);
        i++;
      }

      for (const element of todos.querySelectorAll('li')) {
        openTodo(element, todos, currentAccount, currentProject);
      }

      todos.appendChild(addNewTodo(currentProject, todos, currentAccount));
    });
    doneButton.innerText = 'Done';
    doneButton.addEventListener('click', () => {
      // If title is empty, save the new description but leave the previous title.
      if (title.value == '') {
        todos.removeChild(todoContainer);
        element.style.display = 'flex';
        currentProject.todos[index].description = description.value;
        localStorage.setItem('user', JSON.stringify(currentAccount));
        return;
      }

      currentProject.todos[index].title = title.value;
      currentProject.todos[index].description = description.value;
      currentProject.todos[index].dueDate = dueDate.value;
      localStorage.setItem('user', JSON.stringify(currentAccount));
      todos.removeChild(todoContainer);
      element.querySelectorAll('div')[0].innerText = title.value;
      element.querySelectorAll('div')[1].innerText = dueDate.value;
      element.style.display = 'flex';
    });
    todos.insertBefore(todoContainer, todos.children[index]);
  });
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --todos-bg: #E2E2E2;\n  --todos-fg: #24292E;\n  --todos-divider: grey;\n  --projects-bg: #c4c4c4;\n  --projects-selected-bg: rgb(146, 146, 146);\n  --dashboard-divider: black;\n  --buttons-hover-bg: #aaaaaa;\n  --todo-border: rgb(133, 133, 133);\n  --todo-date-green: green;\n  --todo-title-bg: transparent;\n  color-scheme: light;\n}\n\n:root.light {\n  --todos-bg: #E2E2E2;\n  --todos-fg: #24292E;\n  --todos-divider: grey;\n  --projects-bg: #c4c4c4;\n  --projects-selected-bg: rgb(146, 146, 146);\n  --dashboard-divider: black;\n  --buttons-hover-bg: #aaaaaa;\n  --todo-border: rgb(133, 133, 133);\n  --todo-date-green: green;\n  --todo-title-bg: transparent;\n  color-scheme: light;\n}\n\n:root.dark {\n  --todos-bg: #24292E;\n  --todos-fg: #E2E2E2;\n  --todos-divider: grey;\n  --projects-bg: #1F2428;\n  --projects-selected-bg: rgb(112, 112, 112);\n  --dashboard-divider: black;\n  --buttons-hover-bg: #414950;\n  --todo-border: rgb(133, 133, 133);\n  --todo-date-green: #72ff72;\n  --todo-title-bg: transparent;\n  color-scheme: dark;\n}\n\n#todos-container button, #add-project-button {\n  background-color: transparent;\n  color: var(--todos-fg);\n  border: 1px solid var(--todos-divider);\n  cursor: pointer;\n  border-radius: 6px;\n  padding: 0.5rem;\n}\n\n#todos-container button:hover, #add-project-button:hover {\n  background-color: var(--buttons-hover-bg);\n}\n\nbody {\n  margin: 0;\n  font-family: 'Roboto';\n\n  font-weight: 500;\n}\n\n.dashboard {\n  display: grid;\n  grid-template-columns: minmax(300px, 400px);\n  height: 100vh;\n  width: 100vw;\n}\n\nli {\n  list-style: none;\n}\n\nul {\n  padding: 0;\n}\n\n.projects-container {\n  /* border-right: 1px solid var(--dashboard-divider); */\n  grid-column: 1;\n  grid-row: 1 / 2;\n  background-color: var(--projects-bg);\n  color: var(--todos-fg);\n  padding: 2rem;\n}\n\n.projects-container li {\n  padding: 0.5rem;\n  margin: 0.5rem 0 0.5rem 0;\n}\n\n.projects .project {\n  cursor: pointer;\n}\n\n.project.selected-project {\n  background-color: var(--projects-selected-bg);\n  border-radius: 6px;\n}\n\n.project-menu {\n  display: flex;\n  flex-direction: column;\n}\n\n.project {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.project-buttons button {\n  cursor: pointer;\n  border-radius: 6px;\n  border: 1px solid var(--todos-divider);\n  padding: 0.5rem;\n\n}\n\n#delete-project:hover {\n  background-color: rgb(197, 77, 77);\n}\n\n.delete-project {\n  width: 2rem;\n  height: 2rem;\n}\n\n#todos-container {\n  grid-column: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: var(--todos-bg);\n  color: var(--todos-fg);\n  flex-shrink: 0;\n  padding-top: 10vh;\n}\n\n#inner-project-title {\n  font-size: 1.3rem;\n  font-weight: 800;\n}\n\n#todos {\n  width: 80%;\n  max-width: 800px;\n}\n\nli .checkbox {\n  background-color: var(--projects-bg);\n}\n\n.todo-section {\n  padding: 1.1rem;\n  margin-bottom: 1.1rem;\n  border-bottom: 1px solid var(--todos-divider);\n  display: flex;\n  flex-direction: column;\n}\n\n#todo-title, #todo-description {\n  font-family: 'Roboto';\n  border: 1px solid var(--todo-border);\n  border-radius: 6px;\n  padding: 10px;\n  width: 400px;\n  resize: none;\n}\n\n#todo-buttons {\n  margin-top: 10px;\n}\n\n#todo-buttons button {\n  margin-right: 10px;\n}\n\n#todo-title {\n  font-size: 18px;\n  background-color: var(--todo-title-bg);\n  color: var(--todos-fg);\n  height: 22px;\n  overflow: hidden;\n}\n\n#todo-buttons #remove-task-button:hover {\n  background-color: rgb(197, 77, 77);\n}\n\n#todo-description {\n  font-size: 14px;\n  background-color: var(--todo-title-bg);\n  color: var(--todos-fg);\n  height: 5rem;\n}\n\n#todo-title:focus, #todo-description:focus {\n  outline: none;\n}\n\n#todos li {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 1.1rem 0 1.1rem 1.1rem;\n  border-bottom: 1px solid var(--todos-divider);\n}\n\n#todos li:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.checkbox {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.add-todo {\n  margin-top: 1rem;\n  margin-left: 1rem;\n}\n\n.create-todo-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#todo-title-input {\n  width: 30rem;\n}\n\n#todo-description-input {\n  height: 5rem;\n  width: 30rem;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAGA;EACE,mBAAmB;EACnB,mBAAmB;EACnB,qBAAqB;EACrB,sBAAsB;EACtB,0CAA0C;EAC1C,0BAA0B;EAC1B,2BAA2B;EAC3B,iCAAiC;EACjC,wBAAwB;EACxB,4BAA4B;EAC5B,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,mBAAmB;EACnB,qBAAqB;EACrB,sBAAsB;EACtB,0CAA0C;EAC1C,0BAA0B;EAC1B,2BAA2B;EAC3B,iCAAiC;EACjC,wBAAwB;EACxB,4BAA4B;EAC5B,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,mBAAmB;EACnB,qBAAqB;EACrB,sBAAsB;EACtB,0CAA0C;EAC1C,0BAA0B;EAC1B,2BAA2B;EAC3B,iCAAiC;EACjC,0BAA0B;EAC1B,4BAA4B;EAC5B,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,sBAAsB;EACtB,sCAAsC;EACtC,eAAe;EACf,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,SAAS;EACT,qBAAqB;;EAErB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,2CAA2C;EAC3C,aAAa;EACb,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,sDAAsD;EACtD,cAAc;EACd,eAAe;EACf,oCAAoC;EACpC,sBAAsB;EACtB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,6CAA6C;EAC7C,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,sCAAsC;EACtC,eAAe;;AAEjB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,cAAc;EACd,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iCAAiC;EACjC,sBAAsB;EACtB,cAAc;EACd,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,eAAe;EACf,qBAAqB;EACrB,6CAA6C;EAC7C,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;EACrB,oCAAoC;EACpC,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,sCAAsC;EACtC,sBAAsB;EACtB,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,eAAe;EACf,sCAAsC;EACtC,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,+BAA+B;EAC/B,6CAA6C;AAC/C;;AAEA;EACE,0BAA0B;EAC1B,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,YAAY;AACd","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\n\n\n:root {\n  --todos-bg: #E2E2E2;\n  --todos-fg: #24292E;\n  --todos-divider: grey;\n  --projects-bg: #c4c4c4;\n  --projects-selected-bg: rgb(146, 146, 146);\n  --dashboard-divider: black;\n  --buttons-hover-bg: #aaaaaa;\n  --todo-border: rgb(133, 133, 133);\n  --todo-date-green: green;\n  --todo-title-bg: transparent;\n  color-scheme: light;\n}\n\n:root.light {\n  --todos-bg: #E2E2E2;\n  --todos-fg: #24292E;\n  --todos-divider: grey;\n  --projects-bg: #c4c4c4;\n  --projects-selected-bg: rgb(146, 146, 146);\n  --dashboard-divider: black;\n  --buttons-hover-bg: #aaaaaa;\n  --todo-border: rgb(133, 133, 133);\n  --todo-date-green: green;\n  --todo-title-bg: transparent;\n  color-scheme: light;\n}\n\n:root.dark {\n  --todos-bg: #24292E;\n  --todos-fg: #E2E2E2;\n  --todos-divider: grey;\n  --projects-bg: #1F2428;\n  --projects-selected-bg: rgb(112, 112, 112);\n  --dashboard-divider: black;\n  --buttons-hover-bg: #414950;\n  --todo-border: rgb(133, 133, 133);\n  --todo-date-green: #72ff72;\n  --todo-title-bg: transparent;\n  color-scheme: dark;\n}\n\n#todos-container button, #add-project-button {\n  background-color: transparent;\n  color: var(--todos-fg);\n  border: 1px solid var(--todos-divider);\n  cursor: pointer;\n  border-radius: 6px;\n  padding: 0.5rem;\n}\n\n#todos-container button:hover, #add-project-button:hover {\n  background-color: var(--buttons-hover-bg);\n}\n\nbody {\n  margin: 0;\n  font-family: 'Roboto';\n\n  font-weight: 500;\n}\n\n.dashboard {\n  display: grid;\n  grid-template-columns: minmax(300px, 400px);\n  height: 100vh;\n  width: 100vw;\n}\n\nli {\n  list-style: none;\n}\n\nul {\n  padding: 0;\n}\n\n.projects-container {\n  /* border-right: 1px solid var(--dashboard-divider); */\n  grid-column: 1;\n  grid-row: 1 / 2;\n  background-color: var(--projects-bg);\n  color: var(--todos-fg);\n  padding: 2rem;\n}\n\n.projects-container li {\n  padding: 0.5rem;\n  margin: 0.5rem 0 0.5rem 0;\n}\n\n.projects .project {\n  cursor: pointer;\n}\n\n.project.selected-project {\n  background-color: var(--projects-selected-bg);\n  border-radius: 6px;\n}\n\n.project-menu {\n  display: flex;\n  flex-direction: column;\n}\n\n.project {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.project-buttons button {\n  cursor: pointer;\n  border-radius: 6px;\n  border: 1px solid var(--todos-divider);\n  padding: 0.5rem;\n\n}\n\n#delete-project:hover {\n  background-color: rgb(197, 77, 77);\n}\n\n.delete-project {\n  width: 2rem;\n  height: 2rem;\n}\n\n#todos-container {\n  grid-column: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: var(--todos-bg);\n  color: var(--todos-fg);\n  flex-shrink: 0;\n  padding-top: 10vh;\n}\n\n#inner-project-title {\n  font-size: 1.3rem;\n  font-weight: 800;\n}\n\n#todos {\n  width: 80%;\n  max-width: 800px;\n}\n\nli .checkbox {\n  background-color: var(--projects-bg);\n}\n\n.todo-section {\n  padding: 1.1rem;\n  margin-bottom: 1.1rem;\n  border-bottom: 1px solid var(--todos-divider);\n  display: flex;\n  flex-direction: column;\n}\n\n#todo-title, #todo-description {\n  font-family: 'Roboto';\n  border: 1px solid var(--todo-border);\n  border-radius: 6px;\n  padding: 10px;\n  width: 400px;\n  resize: none;\n}\n\n#todo-buttons {\n  margin-top: 10px;\n}\n\n#todo-buttons button {\n  margin-right: 10px;\n}\n\n#todo-title {\n  font-size: 18px;\n  background-color: var(--todo-title-bg);\n  color: var(--todos-fg);\n  height: 22px;\n  overflow: hidden;\n}\n\n#todo-buttons #remove-task-button:hover {\n  background-color: rgb(197, 77, 77);\n}\n\n#todo-description {\n  font-size: 14px;\n  background-color: var(--todo-title-bg);\n  color: var(--todos-fg);\n  height: 5rem;\n}\n\n#todo-title:focus, #todo-description:focus {\n  outline: none;\n}\n\n#todos li {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 1.1rem 0 1.1rem 1.1rem;\n  border-bottom: 1px solid var(--todos-divider);\n}\n\n#todos li:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.checkbox {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.add-todo {\n  margin-top: 1rem;\n  margin-left: 1rem;\n}\n\n.create-todo-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#todo-title-input {\n  width: 30rem;\n}\n\n#todo-description-input {\n  height: 5rem;\n  width: 30rem;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLHFHQUFxRyxhQUFhLHdCQUF3Qix3QkFBd0IsMEJBQTBCLDJCQUEyQiwrQ0FBK0MsK0JBQStCLGdDQUFnQyxzQ0FBc0MsNkJBQTZCLGlDQUFpQyx3QkFBd0IsR0FBRyxpQkFBaUIsd0JBQXdCLHdCQUF3QiwwQkFBMEIsMkJBQTJCLCtDQUErQywrQkFBK0IsZ0NBQWdDLHNDQUFzQyw2QkFBNkIsaUNBQWlDLHdCQUF3QixHQUFHLGdCQUFnQix3QkFBd0Isd0JBQXdCLDBCQUEwQiwyQkFBMkIsK0NBQStDLCtCQUErQixnQ0FBZ0Msc0NBQXNDLCtCQUErQixpQ0FBaUMsdUJBQXVCLEdBQUcsa0RBQWtELGtDQUFrQywyQkFBMkIsMkNBQTJDLG9CQUFvQix1QkFBdUIsb0JBQW9CLEdBQUcsOERBQThELDhDQUE4QyxHQUFHLFVBQVUsY0FBYywwQkFBMEIsdUJBQXVCLEdBQUcsZ0JBQWdCLGtCQUFrQixnREFBZ0Qsa0JBQWtCLGlCQUFpQixHQUFHLFFBQVEscUJBQXFCLEdBQUcsUUFBUSxlQUFlLEdBQUcseUJBQXlCLHlEQUF5RCxxQkFBcUIsb0JBQW9CLHlDQUF5QywyQkFBMkIsa0JBQWtCLEdBQUcsNEJBQTRCLG9CQUFvQiw4QkFBOEIsR0FBRyx3QkFBd0Isb0JBQW9CLEdBQUcsK0JBQStCLGtEQUFrRCx1QkFBdUIsR0FBRyxtQkFBbUIsa0JBQWtCLDJCQUEyQixHQUFHLGNBQWMsa0JBQWtCLG1DQUFtQyx3QkFBd0IsR0FBRyw2QkFBNkIsb0JBQW9CLHVCQUF1QiwyQ0FBMkMsb0JBQW9CLEtBQUssMkJBQTJCLHVDQUF1QyxHQUFHLHFCQUFxQixnQkFBZ0IsaUJBQWlCLEdBQUcsc0JBQXNCLG1CQUFtQixrQkFBa0IsMkJBQTJCLHdCQUF3QixzQ0FBc0MsMkJBQTJCLG1CQUFtQixzQkFBc0IsR0FBRywwQkFBMEIsc0JBQXNCLHFCQUFxQixHQUFHLFlBQVksZUFBZSxxQkFBcUIsR0FBRyxrQkFBa0IseUNBQXlDLEdBQUcsbUJBQW1CLG9CQUFvQiwwQkFBMEIsa0RBQWtELGtCQUFrQiwyQkFBMkIsR0FBRyxvQ0FBb0MsMEJBQTBCLHlDQUF5Qyx1QkFBdUIsa0JBQWtCLGlCQUFpQixpQkFBaUIsR0FBRyxtQkFBbUIscUJBQXFCLEdBQUcsMEJBQTBCLHVCQUF1QixHQUFHLGlCQUFpQixvQkFBb0IsMkNBQTJDLDJCQUEyQixpQkFBaUIscUJBQXFCLEdBQUcsNkNBQTZDLHVDQUF1QyxHQUFHLHVCQUF1QixvQkFBb0IsMkNBQTJDLDJCQUEyQixpQkFBaUIsR0FBRyxnREFBZ0Qsa0JBQWtCLEdBQUcsZUFBZSxrQkFBa0Isd0JBQXdCLGNBQWMsb0NBQW9DLGtEQUFrRCxHQUFHLHFCQUFxQiwrQkFBK0Isb0JBQW9CLEdBQUcsZUFBZSxrQkFBa0IsbUJBQW1CLEdBQUcsZUFBZSxxQkFBcUIsc0JBQXNCLEdBQUcsdUJBQXVCLGtCQUFrQiwyQkFBMkIsR0FBRyx1QkFBdUIsaUJBQWlCLEdBQUcsNkJBQTZCLGlCQUFpQixpQkFBaUIsR0FBRyxxQkFBcUI7QUFDOWpWO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUjFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFEO0FBQ3JEOztBQUVBO0FBQ0EsZ0RBQWdEO0FBQ2hEOztBQUVBO0FBQ0EscUZBQXFGO0FBQ3JGOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EsS0FBSztBQUNMLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixxQkFBcUI7QUFDMUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDckdhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9kYXNoYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRGVtbyB9IGZyb20gJy4vbG9naWMuanMnO1xuaW1wb3J0IHsgYWRkTmV3UHJvamVjdCwgZGlzcGxheVByb2plY3QsIHN3aXRjaFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IGFkZE5ld1RvZG8sIG9wZW5Ub2RvLCBkaXNwbGF5VG9kbyB9IGZyb20gJy4vdG9kb3MuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGFzaGJvYXJkKCkge1xuICBsZXQgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IHNpZGViYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBsZXQgdG9kb3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IHRvZG9zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbGV0IHRoZW1lVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHRoZW1lVG9nZ2xlLmlubmVySFRNTCA9ICdUb2dnbGUgVGhlbWUnO1xuXG4gIC8vIGxldCB7IGRlbW9BY2NvdW50LCBpbmJveCB9ID0gY3JlYXRlRGVtbygpO1xuICAvLyBsZXQgY3VycmVudFByb2plY3QgPSBpbmJveDtcbiAgLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG5cbiAgbGV0IGRlbW9BY2NvdW50ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgY29uc29sZS5sb2coZGVtb0FjY291bnQpO1xuICBsZXQgY3VycmVudFByb2plY3QgPSBkZW1vQWNjb3VudC5wcm9qZWN0c1swXTtcblxuICBsZXQgYWRkUHJvamVjdCA9IGFkZE5ld1Byb2plY3Qoc2lkZWJhciwgZGVtb0FjY291bnQsIHRvZG9zKTtcbiAgcHJvamVjdHNDb250YWluZXIuY2xhc3NOYW1lID0gJ3Byb2plY3RzLWNvbnRhaW5lcic7XG4gIHNpZGViYXIuY2xhc3NOYW1lID0gJ3Byb2plY3RzJztcbiAgdG9kb3NDb250YWluZXIuaWQgPSAndG9kb3MtY29udGFpbmVyJztcbiAgdG9kb3MuaWQgPSAndG9kb3MnO1xuXG4gIGZvciAoY29uc3QgdG9kbyBvZiBjdXJyZW50UHJvamVjdC50b2Rvcykge1xuICAgIGRpc3BsYXlUb2RvKHRvZG8sIHRvZG9zLCBkZW1vQWNjb3VudCwgY3VycmVudFByb2plY3QpO1xuICB9XG4gIHRvZG9zLmFwcGVuZChhZGROZXdUb2RvKGN1cnJlbnRQcm9qZWN0LCB0b2RvcywgZGVtb0FjY291bnQpKTtcblxuICB0aGVtZVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGNvbnN0IG5ld1RoZW1lID0gcm9vdC5jbGFzc05hbWUgPT09ICdkYXJrJyA/ICdsaWdodCcgOiAnZGFyayc7XG4gICAgcm9vdC5jbGFzc05hbWUgPSBuZXdUaGVtZTtcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuc2V0QXR0cmlidXRlKCdjb2xvci1zY2hlbWUnLCAnbGlnaHQnKTtcbiAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykpO1xuICB9KVxuXG4gIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZCh0aGVtZVRvZ2dsZSk7XG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBkZW1vQWNjb3VudC5wcm9qZWN0cykge1xuICAgIHNpZGViYXIuYXBwZW5kKGRpc3BsYXlQcm9qZWN0KHByb2plY3QsIHNpZGViYXIsIGRlbW9BY2NvdW50LCB0b2RvcykpO1xuICB9XG4gIHNpZGViYXIucXVlcnlTZWxlY3RvcignbGknKS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1wcm9qZWN0Jyk7XG5cbiAgc2lkZWJhci5hcHBlbmQoYWRkUHJvamVjdCk7XG4gIHRvZG9zQ29udGFpbmVyLmFwcGVuZCh0b2Rvcyk7XG4gIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZChzaWRlYmFyKTtcbiAgY29udGVudC5jbGFzc05hbWUgPSAnZGFzaGJvYXJkJztcbiAgY29udGVudC5hcHBlbmQocHJvamVjdHNDb250YWluZXIpO1xuICBjb250ZW50LmFwcGVuZCh0b2Rvc0NvbnRhaW5lcik7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoZGVtb0FjY291bnQpKTtcblxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdG9kb3MucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgIG9wZW5Ub2RvKGVsZW1lbnQsIHRvZG9zLCBkZW1vQWNjb3VudCwgY3VycmVudFByb2plY3QpO1xuICB9XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIHNpZGViYXIucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgIHN3aXRjaFByb2plY3QoZWxlbWVudCwgc2lkZWJhciwgdG9kb3MsIGRlbW9BY2NvdW50KTtcbiAgfVxuXG4gIGxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJvamVjdFRpdGxlLmlkID0gJ2lubmVyLXByb2plY3QtdGl0bGUnO1xuICBwcm9qZWN0VGl0bGUuaW5uZXJIVE1MID0gc2lkZWJhci5maXJzdENoaWxkLmZpcnN0Q2hpbGQuaW5uZXJIVE1MO1xuICB0b2Rvcy5iZWZvcmUocHJvamVjdFRpdGxlKTtcblxuICByZXR1cm4gY29udGVudDtcbn1cbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgZGFzaGJvYXJkIH0gZnJvbSAnLi9kYXNoYm9hcmQuanMnO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZChkYXNoYm9hcmQoKSk7XG5cbiIsImV4cG9ydCBmdW5jdGlvbiBhY2NvdW50KG5hbWUpIHtcbiAgbGV0IHByb2plY3RzID0gW107XG4gIGZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdCkge1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gIH1cbiAgcmV0dXJuIHsgYWRkUHJvamVjdCwgcHJvamVjdHMsIG5hbWUgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdCh0aXRsZSkge1xuICBsZXQgdG9kb3MgPSBbXTtcbiAgZnVuY3Rpb24gYWRkVG9kbyh0b2RvKSB7XG4gICAgdG9kb3MucHVzaCh0b2RvKTtcbiAgfVxuICByZXR1cm4geyBhY2NvdW50LCBhZGRUb2RvLCB0b2RvcywgdGl0bGUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZG8odGl0bGUgPSAnVG9kbyBUaXRsZScsIGRlc2NyaXB0aW9uID0gJ1RvZG8gRGVzY3JpcHRpb24nLCBkdWVEYXRlID0gbmV3IERhdGUoKSwgY29tcGxldGVkID0gZmFsc2UpIHtcbiAgaWYgKHR5cGVvZiBkdWVEYXRlID09ICdvYmplY3QnKSB7XG4gICAgZHVlRGF0ZSA9IFtcbiAgICAgIGR1ZURhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgIChkdWVEYXRlLmdldE1vbnRoKCkrMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpLFxuICAgICAgKGR1ZURhdGUuZ2V0RGF0ZSgpKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyksXG4gICAgXS5qb2luKCctJyk7XG4gIH1cbiAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBjb21wbGV0ZWQgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlbW8oKSB7XG4gIGNvbnN0IGRlbW9BY2NvdW50ID0gYWNjb3VudCgnRGVtb21hbicpO1xuICBjb25zdCBpbmJveCA9IHByb2plY3QoJ0luYm94Jyk7XG4gIGNvbnN0IHdlYnNpdGUgPSBwcm9qZWN0KCdNeSB3ZWJzaXRlIHByb2plY3QnKTtcbiAgY29uc3QgbXlUb2RvID0gdG9kbygnRXhhbXBsZSBUb2RvJywgJ0hlcmUgaXMgYW4gZXhhbXBsZSBkZXNjcmlwdGlvbicsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgY29uc3QgY29tcGxldGVkVG9kbyA9IHRvZG8oJ0NvbXBsZXRlZCBUb2RvJywgJ0hlcmUgaXMgYW4gZXhhbXBsZSBvZiBhIGNvbXBsZXRlZCB0b2RvJywgbmV3IERhdGUoKSwgdHJ1ZSk7XG4gIGNvbnN0IGhhbGZGaWxsZWRUb2RvID0gdG9kbygnSGFsZiBUb2RvJywgJ0Rlc2NyaXB0aW9uIGFuZCBubyBkYXRlIG9yIGNvbXBsZXRlZCB2YWx1ZScsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgY29uc3QgbXlUb2RvMSA9IHRvZG8oKTtcbiAgY29uc3Qgd2Vic2l0ZVRvZG8gPSB0b2RvKCdBZGQgZGl2cycsICdBZGQgc3RhcnRpbmcgZGl2cyB0byBteSB3ZWJzaXRlJywgbmV3IERhdGUoKSwgZmFsc2UpO1xuICBjb25zdCB3ZWJzaXRlVG9kbzEgPSB0b2RvKCdTdHlsZSBkaXZzJywgJ1N0eWxlIG15IGRpdnMgdG8gbWFrZSB0aGVtIGxvb2sgbmljZS4nLCBuZXcgRGF0ZSgpLCBmYWxzZSk7XG4gIFxuICBkZW1vQWNjb3VudC5hZGRQcm9qZWN0KGluYm94KTtcbiAgZGVtb0FjY291bnQuYWRkUHJvamVjdCh3ZWJzaXRlKTtcbiAgaW5ib3guYWRkVG9kbyhjb21wbGV0ZWRUb2RvKTtcbiAgaW5ib3guYWRkVG9kbyhteVRvZG8pO1xuICBpbmJveC5hZGRUb2RvKG15VG9kbzEpO1xuICBpbmJveC5hZGRUb2RvKGhhbGZGaWxsZWRUb2RvKTtcbiAgd2Vic2l0ZS5hZGRUb2RvKHdlYnNpdGVUb2RvKTtcbiAgd2Vic2l0ZS5hZGRUb2RvKHdlYnNpdGVUb2RvMSk7XG4gIHJldHVybiB7IGRlbW9BY2NvdW50LCBpbmJveCB9XG59XG4iLCJpbXBvcnQge2Rpc3BsYXlUb2RvLCBhZGROZXdUb2RvLCBvcGVuVG9kb30gZnJvbSAnLi90b2Rvcy5qcyc7XG5pbXBvcnQge3Byb2plY3R9IGZyb20gJy4vbG9naWMuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdCwgc2lkZWJhciwgY3VycmVudEFjY291bnQsIHRvZG9zKSB7XG4gIGxldCBwcm9qZWN0RGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBwcm9qZWN0VGl0bGUuaWQgPSAncHJvamVjdC1uYW1lJztcbiAgcHJvamVjdERpc3BsYXkuY2xhc3NOYW1lID0gJ3Byb2plY3QnO1xuICBwcm9qZWN0VGl0bGUuaW5uZXJIVE1MID0gcHJvamVjdC50aXRsZTtcblxuICBsZXQgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgbWVudS5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xuICBtZW51LmNsYXNzTGlzdC5hZGQoJ2ZhLWVsbGlwc2lzJyk7XG4gIG1lbnUuY2xhc3NMaXN0LmFkZCgnZmEteGwnKTtcbiAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgcHJvamVjdE1lbnUoZSwgcHJvamVjdERpc3BsYXksIHByb2plY3RUaXRsZSwgbWVudSwgXG4gICAgICAgICAgICAgICAgc2lkZWJhciwgcHJvamVjdCwgY3VycmVudEFjY291bnQsIHRvZG9zKTtcbiAgfSk7XG4gIHByb2plY3REaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICBpZiAoIXByb2plY3REaXNwbGF5LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1tZW51JykpXG4gICAgICBwcm9qZWN0RGlzcGxheS5hcHBlbmQobWVudSk7XG4gIH0pO1xuICBwcm9qZWN0RGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICBpZiAoIXByb2plY3REaXNwbGF5LmNsYXNzTGlzdC5jb250YWlucygncHJvamVjdC1tZW51JykpXG4gICAgcHJvamVjdERpc3BsYXkucmVtb3ZlQ2hpbGQobWVudSlcbiAgfSk7XG4gIHByb2plY3REaXNwbGF5LmFwcGVuZChwcm9qZWN0VGl0bGUpO1xuICByZXR1cm4gcHJvamVjdERpc3BsYXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGROZXdQcm9qZWN0KHByb2plY3RzLCBjdXJyZW50QWNjb3VudCwgdG9kb3MpIHtcbiAgbGV0IGFkZFByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYWRkUHJvamVjdC5pbm5lckhUTUwgPSAnQWRkIG5ldyBwcm9qZWN0JztcbiAgYWRkUHJvamVjdC5pZCA9ICdhZGQtcHJvamVjdC1idXR0b24nO1xuICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKGFkZFByb2plY3QpO1xuICAgIGxldCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxldCBwcm9qZWN0U3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdFN1Ym1pdC5pbm5lckhUTUwgPSAnU3VibWl0JztcbiAgICBwcm9qZWN0U3VibWl0LmlkID0gJ3N1Ym1pdCc7XG4gICAgcHJvamVjdFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0SW5wdXQudmFsdWUgIT0gJycpIHtcbiAgICAgICAgbGV0IG5ld1Byb2plY3QgPSBwcm9qZWN0KHByb2plY3RJbnB1dC52YWx1ZSk7XG4gICAgICAgIGN1cnJlbnRBY2NvdW50LnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgICAgbGV0IHByb2plY3REaXNwbGF5ID0gZGlzcGxheVByb2plY3QobmV3UHJvamVjdCwgcHJvamVjdHMsIGN1cnJlbnRBY2NvdW50LCB0b2Rvcyk7XG4gICAgICAgIHByb2plY3RzLmFwcGVuZChwcm9qZWN0RGlzcGxheSwgYWRkUHJvamVjdCk7XG4gICAgICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3RJbnB1dCk7XG4gICAgICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3RTdWJtaXQpO1xuXG4gICAgICAgIHN3aXRjaFByb2plY3QocHJvamVjdERpc3BsYXksIHByb2plY3RzLCB0b2RvcywgY3VycmVudEFjY291bnQpO1xuICAgICAgfVxuICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdElucHV0KTtcbiAgICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3RTdWJtaXQpO1xuICAgICAgcHJvamVjdHMuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdCk7XG4gICAgfSk7XG4gICAgcHJvamVjdHMuYXBwZW5kKHByb2plY3RJbnB1dCk7XG4gICAgcHJvamVjdHMuYXBwZW5kKHByb2plY3RTdWJtaXQpO1xuICAgIHByb2plY3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09ICdFbnRlcicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpLmNsaWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYWRkUHJvamVjdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFByb2plY3QocHJvamVjdEVsZW1lbnQsIHByb2plY3RzLCB0b2RvcywgY3VycmVudEFjY291bnQpIHtcbiAgLy8gQ2xpY2sgb24gcHJvamVjdHMgdG8gc3dpdGNoIGN1cnJlbnRQcm9qZWN0XG4gIHZhciBwcm9qZWN0Tm9kZXMgPSBBcnJheS5mcm9tKHByb2plY3RzLmNoaWxkcmVuKTtcbiAgcHJvamVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0OyBcbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0RJVicpIHtcbiAgICAgIHRhcmdldCA9IHByb2plY3RFbGVtZW50O1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0knKSB7XG4gICAgICB0YXJnZXQgPSBwcm9qZWN0RWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHRhcmdldCAhPT0gdGhpcykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICBwcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLXByb2plY3QnKTtcbiAgICB9XG4gICAgcHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtcHJvamVjdCcpO1xuXG4gICAgbGV0IGluZGV4ID0gcHJvamVjdE5vZGVzLmluZGV4T2YodGFyZ2V0KTtcbiAgICB3aGlsZSh0b2Rvcy5maXJzdENoaWxkKSB7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9zLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBsZXQgY3VycmVudFByb2plY3QgPSBjdXJyZW50QWNjb3VudC5wcm9qZWN0c1tpbmRleF07XG5cbiAgICAvLyBBZGQgcHJvamVjdCB0aXRsZSB0byB0aGUgdG9wIG9mIHRoZSB0b2RvIGxpc3RcbiAgICBsZXQgdG9kb3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kb3MtY29udGFpbmVyJyk7XG4gICAgaWYgKHRvZG9zQ29udGFpbmVyLmNvbnRhaW5zKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbm5lci1wcm9qZWN0LXRpdGxlJykpKSB7XG4gICAgICB0b2Rvc0NvbnRhaW5lci5yZW1vdmVDaGlsZCh0b2Rvc0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RUaXRsZS5pZCA9ICdpbm5lci1wcm9qZWN0LXRpdGxlJztcbiAgICBpZiAocHJvamVjdEVsZW1lbnQuZmlyc3RDaGlsZC50YWdOYW1lID09ICdESVYnKVxuICAgICAgcHJvamVjdFRpdGxlLmlubmVySFRNTCA9IHByb2plY3RFbGVtZW50LmZpcnN0Q2hpbGQuaW5uZXJIVE1MO1xuICAgIGlmIChwcm9qZWN0RWxlbWVudC5maXJzdENoaWxkLnRhZ05hbWUgPT0gJ0lOUFVUJylcbiAgICAgIHByb2plY3RUaXRsZS5pbm5lckhUTUwgPSBwcm9qZWN0RWxlbWVudC5maXJzdENoaWxkLnZhbHVlO1xuICAgIHRvZG9zLmJlZm9yZShwcm9qZWN0VGl0bGUpXG5cbiAgICBmb3IgKGNvbnN0IHRvZG8gb2YgY3VycmVudFByb2plY3QudG9kb3MpIHtcbiAgICAgIGRpc3BsYXlUb2RvKHRvZG8sIHRvZG9zLCBjdXJyZW50QWNjb3VudCwgY3VycmVudFByb2plY3QpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdG9kb3MucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgb3BlblRvZG8oZWxlbWVudCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gICAgfVxuICAgIHRvZG9zLmFwcGVuZChhZGROZXdUb2RvKGN1cnJlbnRQcm9qZWN0LCB0b2RvcywgY3VycmVudEFjY291bnQpKTtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdE1lbnUoZSwgcHJvamVjdERpc3BsYXksIHByb2plY3RUaXRsZSwgbWVudSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0cywgcHJvamVjdCwgY3VycmVudEFjY291bnQsIHRvZG9zKSB7XG4gIHZhciBub2RlcyA9IEFycmF5LmZyb20ocHJvamVjdHMuY2hpbGRyZW4pO1xuICBsZXQgcHJvamVjdFRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBsZXQgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBsZXQgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGxldCBpbmRleCA9IG5vZGVzLmluZGV4T2YoZS50YXJnZXQucGFyZW50RWxlbWVudCk7XG4gIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1tZW51Jyk7XG4gIGRlbGV0ZUJ1dHRvbi5pZCA9ICdkZWxldGUtcHJvamVjdCc7XG4gIGRvbmVCdXR0b24uaWQgPSAnc3VibWl0LXByb2plY3QnO1xuICBkb25lQnV0dG9uLmlubmVySFRNTCA9ICdEb25lJztcbiAgZGVsZXRlQnV0dG9uLmlubmVySFRNTCA9ICdEZWxldGUnO1xuICBidXR0b25zQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdwcm9qZWN0LWJ1dHRvbnMnO1xuICBwcm9qZWN0VGl0bGVJbnB1dC52YWx1ZSA9IHByb2plY3QudGl0bGU7XG4gIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKGRlbGV0ZUJ1dHRvbiwgZG9uZUJ1dHRvbik7XG4gIHByb2plY3REaXNwbGF5LnJlbW92ZUNoaWxkKHByb2plY3RUaXRsZSk7XG4gIHByb2plY3REaXNwbGF5LnJlbW92ZUNoaWxkKG1lbnUpO1xuICBwcm9qZWN0RGlzcGxheS5hcHBlbmQocHJvamVjdFRpdGxlSW5wdXQsIGJ1dHRvbnNDb250YWluZXIpO1xuXG4gIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY3VycmVudEFjY291bnQucHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChwcm9qZWN0RGlzcGxheSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgIGxldCBpID0gMDtcbiAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChwcm9qZWN0cy5sYXN0Q2hpbGQpO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwcm9qZWN0cy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgIHByb2plY3RzLmFwcGVuZChkaXNwbGF5UHJvamVjdChjdXJyZW50QWNjb3VudC5wcm9qZWN0c1tpXSwgcHJvamVjdHMsIGN1cnJlbnRBY2NvdW50LCB0b2RvcykpO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcHJvamVjdHMucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgY29uc29sZS5sb2coJ2Z1Y2snKTtcbiAgICAgIHN3aXRjaFByb2plY3QoZWxlbWVudCwgcHJvamVjdHMsIHRvZG9zLCBjdXJyZW50QWNjb3VudCk7XG4gICAgfVxuICAgIHByb2plY3RzLmFwcGVuZENoaWxkKGFkZE5ld1Byb2plY3QocHJvamVjdHMsIGN1cnJlbnRBY2NvdW50LCB0b2RvcykpO1xuICB9KTtcblxuICBkb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChwcm9qZWN0VGl0bGVJbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgY3VycmVudEFjY291bnQucHJvamVjdHNbaW5kZXhdLnRpdGxlID0gcHJvamVjdFRpdGxlSW5wdXQudmFsdWU7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgfVxuICAgICAgbGV0IHJlc3VsdFByb2plY3REaXNwbGF5ID0gZGlzcGxheVByb2plY3QocHJvamVjdCwgcHJvamVjdHMsIGN1cnJlbnRBY2NvdW50LCB0b2Rvcyk7XG4gICAgICBpZiAocHJvamVjdERpc3BsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZC1wcm9qZWN0JykpXG4gICAgICAgIHJlc3VsdFByb2plY3REaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLXByb2plY3QnKTtcbiAgICAgIHByb2plY3REaXNwbGF5LmJlZm9yZShyZXN1bHRQcm9qZWN0RGlzcGxheSk7XG4gICAgICBzd2l0Y2hQcm9qZWN0KHJlc3VsdFByb2plY3REaXNwbGF5LCBwcm9qZWN0cywgdG9kb3MsIGN1cnJlbnRBY2NvdW50KTtcbiAgICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3REaXNwbGF5KTtcbiAgfSk7XG5cbiAgcHJvamVjdFRpdGxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQtcHJvamVjdCcpLmNsaWNrKCk7XG4gICAgfVxuICB9KTsgXG5cbn0iLCJpbXBvcnQgeyB0b2RvIH0gZnJvbSAnLi9sb2dpYy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5VG9kbyh0b2RvLCB0b2RvcywgY3VycmVudEFjY291bnQpIHtcbiAgbGV0IHRvZG9EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgbGV0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBsZXQgdG9kb0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2hlY2tib3guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gIGNoZWNrYm94LmNsYXNzTmFtZSA9ICdjaGVja2JveCc7XG4gIHRvZG9UaXRsZS5pZCA9ICd0b2RvbGlzdC10b2RvLXRpdGxlJztcbiAgdG9kb0RhdGUuaWQgPSAndG9kby1kYXRlJztcbiAgdG9kb1RpdGxlLmlubmVySFRNTCA9IHRvZG8udGl0bGU7XG4gIHRvZG9EYXRlLmlubmVySFRNTCA9IHRvZG8uZHVlRGF0ZTtcblxuICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICBjdXJyZW50RGF0ZSA9IFtjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgICAoY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSxcbiAgICAgICAgICAgICAgICAgKGN1cnJlbnREYXRlLmdldERhdGUoKSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpLFxuICAgICAgICAgICAgICAgIF0uam9pbignLScpO1xuICBpZiAodG9kby5kdWVEYXRlID09IGN1cnJlbnREYXRlKSB7XG4gICAgdG9kb0RhdGUuc3R5bGUuY29sb3IgPSAndmFyKC0tdG9kby1kYXRlLWdyZWVuKSc7XG4gIH1cbiAgdG9kb0Rpc3BsYXkuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICB0b2RvRGlzcGxheS5hcHBlbmRDaGlsZCh0b2RvVGl0bGUpO1xuICB0b2RvRGlzcGxheS5hcHBlbmRDaGlsZCh0b2RvRGF0ZSk7XG4gIGlmICh0b2RvLmNvbXBsZXRlZCkge1xuICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgIHRvZG9EaXNwbGF5LnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ2xpbmUtdGhyb3VnaCc7XG4gIH1cbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgdG9kby5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgdG9kb0Rpc3BsYXkuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbGluZS10aHJvdWdoJztcbiAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRBY2NvdW50KTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9kby5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgIHRvZG9EaXNwbGF5LnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ25vbmUnO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgIH1cbiAgfSk7XG4gIHRvZG9zLmFwcGVuZCh0b2RvRGlzcGxheSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGROZXdUb2RvKGN1cnJlbnRQcm9qZWN0LCB0b2RvcywgY3VycmVudEFjY291bnQpIHtcbiAgbGV0IGFkZFRvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYWRkVG9kby5jbGFzc05hbWUgPSAnYWRkLXRvZG8nO1xuICBhZGRUb2RvLmlubmVySFRNTCA9ICdBZGQgbmV3IHRhc2snO1xuICBhZGRUb2RvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHRvZG9zLnJlbW92ZUNoaWxkKGFkZFRvZG8pO1xuICAgIGxldCBjcmVhdGVUb2RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IHRvZG9UaXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsZXQgdG9kb0lucHV0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxldCB0b2RvRGVzY3JpcHRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGV0IHRvZG9JbnB1dERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBsZXQgdG9kb0lucHV0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGV0IHRvZG9TdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBsZXQgdG9kb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGxldCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICAgIHRvZG9UaXRsZUxhYmVsLmlubmVySFRNTCA9ICdUaXRsZSc7XG4gICAgdG9kb1RpdGxlTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAndG9kby10aXRsZS1pbnB1dCcpO1xuICAgIHRvZG9EZXNjcmlwdGlvbkxhYmVsLmlubmVySFRNTCA9ICdEZXNjcmlwdGlvbic7XG4gICAgdG9kb0Rlc2NyaXB0aW9uTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAndG9kby1kZXNjcmlwdGlvbi1pbnB1dCcpO1xuICAgIHRvZG9EZXNjcmlwdGlvbkxhYmVsLmZvciA9ICd0b2RvLWRlc2NyaXB0aW9uLWlucHV0JztcbiAgICBjcmVhdGVUb2RvQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdjcmVhdGUtdG9kby1mb3JtJztcbiAgICB0b2RvSW5wdXRUaXRsZS5pZCA9ICd0b2RvLXRpdGxlLWlucHV0JztcbiAgICB0b2RvSW5wdXREZXNjcmlwdGlvbi5pZCA9ICd0b2RvLWRlc2NyaXB0aW9uLWlucHV0JztcbiAgICB0b2RvSW5wdXREZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2NvbHVtbicsIDgwKTtcbiAgICB0b2RvSW5wdXREZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ3JvdycsIDMpO1xuICAgIHRvZG9TdWJtaXQuaW5uZXJIVE1MID0gJ1N1Ym1pdCc7XG4gICAgdG9kb1N1Ym1pdC5pZCA9ICdzdWJtaXQnO1xuICAgIHRvZG9JbnB1dERhdGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2RhdGUnKTtcblxuICAgIHRvZG9TdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodG9kb0lucHV0VGl0bGUudmFsdWUgIT0gJycpIHtcbiAgICAgICAgbGV0IG5ld1RvZG9UaXRsZSA9IHRvZG9JbnB1dFRpdGxlLnZhbHVlO1xuICAgICAgICBsZXQgbmV3VG9kb0Rlc2NyaXB0aW9uID0gdG9kb0lucHV0RGVzY3JpcHRpb24udmFsdWU7XG4gICAgICAgIGxldCBuZXdUb2RvRGF0ZSA9IHRvZG9JbnB1dERhdGUudmFsdWU7XG4gICAgICAgIGlmICh0b2RvSW5wdXREZXNjcmlwdGlvbi52YWx1ZSA9PSAnJykge1xuICAgICAgICAgIG5ld1RvZG9EZXNjcmlwdGlvbiA9ICdFbXB0eSc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld1RvZG8gPSB0b2RvKG5ld1RvZG9UaXRsZSwgbmV3VG9kb0Rlc2NyaXB0aW9uLCBuZXdUb2RvRGF0ZSwgZmFsc2UpO1xuICAgICAgICBjdXJyZW50UHJvamVjdC50b2Rvcy5wdXNoKG5ld1RvZG8pO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgICAgIHRvZG9UaXRsZS5pbm5lckhUTUwgPSBuZXdUb2RvLnRpdGxlO1xuICAgICAgICB0b2RvRGlzcGxheS5hcHBlbmQoY2hlY2tib3gsIHRvZG9UaXRsZSk7XG4gICAgICAgIC8vIHRvZG9zLmFwcGVuZCh0b2RvRGlzcGxheSk7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKGNyZWF0ZVRvZG9Db250YWluZXIpO1xuICAgICAgICB0b2Rvcy5yZW1vdmVDaGlsZCh0b2RvU3VibWl0KTtcbiAgICAgICAgZGlzcGxheVRvZG8obmV3VG9kbywgdG9kb3MsIGN1cnJlbnRBY2NvdW50KTtcblxuICAgICAgICBvcGVuVG9kbyh0b2Rvcy5sYXN0Q2hpbGQsIHRvZG9zLCBjdXJyZW50QWNjb3VudCwgY3VycmVudFByb2plY3QpO1xuICAgICAgICB0b2Rvcy5hcHBlbmRDaGlsZChhZGRUb2RvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKGNyZWF0ZVRvZG9Db250YWluZXIpO1xuICAgICAgICB0b2Rvcy5yZW1vdmVDaGlsZCh0b2RvU3VibWl0KTtcbiAgICAgICAgdG9kb3MuYXBwZW5kQ2hpbGQoYWRkVG9kbyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjcmVhdGVUb2RvQ29udGFpbmVyLmFwcGVuZCh0b2RvVGl0bGVMYWJlbCwgdG9kb0lucHV0VGl0bGUsIHRvZG9EZXNjcmlwdGlvbkxhYmVsLCB0b2RvSW5wdXREZXNjcmlwdGlvbiwgdG9kb0lucHV0RGF0ZSk7XG4gICAgdG9kb3MuYXBwZW5kKGNyZWF0ZVRvZG9Db250YWluZXIpO1xuICAgIHRvZG9zLmFwcGVuZCh0b2RvU3VibWl0KTtcblxuICAgIHRvZG9JbnB1dFRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JykuY2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0b2RvSW5wdXREZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09ICdFbnRlcicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpLmNsaWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gYWRkVG9kbztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Ub2RvKGVsZW1lbnQsIHRvZG9zLCBjdXJyZW50QWNjb3VudCwgY3VycmVudFByb2plY3QpIHtcbiAgdmFyIG5vZGVzID0gQXJyYXkuZnJvbSh0b2Rvcy5jaGlsZHJlbik7XG4gIC8vIENsaWNrIG9uIHRvZG9zIHRvIFwib3BlblwiIHRoZW1cblxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0RJVicpIHtcbiAgICAgIHRhcmdldCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIC8vIENoaWxkcmVuIGFyZSBub3QgYWZmZWN0ZWQgYnkgZXZlbnQuXG4gICAgaWYgKHRhcmdldCAhPT0gdGhpcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbGV0IGluZGV4ID0gbm9kZXMuaW5kZXhPZih0YXJnZXQpO1xuICAgIGxldCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgbGV0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIGxldCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsZXQgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGxldCByZW1vdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBsZXQgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJ1dHRvbnNDb250YWluZXIuaWQgPSAndG9kby1idXR0b25zJztcbiAgICBkb25lQnV0dG9uLmlkID0gJ2RvbmUtdGFzay1idXR0b24nO1xuICAgIHJlbW92ZUJ1dHRvbi5pZCA9ICdyZW1vdmUtdGFzay1idXR0b24nO1xuICAgIGR1ZURhdGUuaWQgPSAnZHVlLWRhdGUnO1xuICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29sdW1uJywgODApO1xuICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgncm93JywgNSk7XG4gICAgZGVzY3JpcHRpb24uaWQgPSAndG9kby1kZXNjcmlwdGlvbic7XG4gICAgZHVlRGF0ZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZGF0ZScpO1xuICAgIGR1ZURhdGUudmFsdWUgPSBjdXJyZW50UHJvamVjdC50b2Rvc1tpbmRleF0uZHVlRGF0ZTtcbiAgICB0b2RvQ29udGFpbmVyLmNsYXNzTmFtZSA9ICd0b2RvLXNlY3Rpb24nO1xuICAgIHRpdGxlLmlkID0gJ3RvZG8tdGl0bGUnO1xuICAgIHRpdGxlLnNldEF0dHJpYnV0ZSgnY29sdW1uJywgODApO1xuICAgIHRpdGxlLnNldEF0dHJpYnV0ZSgncm93JywgMSk7XG4gICAgdGl0bGUudmFsdWUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLmlubmVyVGV4dDtcbiAgICBkZXNjcmlwdGlvbi52YWx1ZSA9IGN1cnJlbnRQcm9qZWN0LnRvZG9zW2luZGV4XS5kZXNjcmlwdGlvbjtcblxuICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5ID09ICdFbnRlcicpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb25lQnV0dG9uLmNsaWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZChyZW1vdmVCdXR0b24sIGRvbmVCdXR0b24pO1xuICAgIHRvZG9Db250YWluZXIuYXBwZW5kKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgYnV0dG9uc0NvbnRhaW5lcik7XG4gICAgcmVtb3ZlQnV0dG9uLmlubmVyVGV4dCA9ICdEZWxldGUgdGFzayc7XG5cbiAgICAvLyBSZW1vdmUgYSB0YXNrXG4gICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY3VycmVudFByb2plY3QudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9Db250YWluZXIpO1xuICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgICBsZXQgaSA9IDA7XG5cbiAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9zLmxhc3RDaGlsZCk7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdG9kb3MucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgICB0b2Rvcy5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZGlzcGxheVRvZG8oY3VycmVudFByb2plY3QudG9kb3NbaV0sIHRvZG9zLCBjdXJyZW50QWNjb3VudCk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0b2Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICAgIG9wZW5Ub2RvKGVsZW1lbnQsIHRvZG9zLCBjdXJyZW50QWNjb3VudCwgY3VycmVudFByb2plY3QpO1xuICAgICAgfVxuICAgICAgdG9kb3MuYXBwZW5kQ2hpbGQoYWRkTmV3VG9kbyhjdXJyZW50UHJvamVjdCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50KSk7XG4gICAgfSk7XG5cbiAgICBkb25lQnV0dG9uLmlubmVyVGV4dCA9ICdEb25lJztcbiAgICBkb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgLy8gSWYgdGl0bGUgaXMgZW1wdHksIHNhdmUgdGhlIG5ldyBkZXNjcmlwdGlvbiBidXQgbGVhdmUgdGhlIHByZXZpb3VzIHRpdGxlLlxuICAgICAgaWYgKHRpdGxlLnZhbHVlID09ICcnKSB7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9Db250YWluZXIpO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zW2luZGV4XS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zW2luZGV4XS50aXRsZSA9IHRpdGxlLnZhbHVlO1xuICAgICAgY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgICBjdXJyZW50UHJvamVjdC50b2Rvc1tpbmRleF0uZHVlRGF0ZSA9IGR1ZURhdGUudmFsdWU7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgICB0b2Rvcy5yZW1vdmVDaGlsZCh0b2RvQ29udGFpbmVyKTtcbiAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2JylbMF0uaW5uZXJUZXh0ID0gdGl0bGUudmFsdWU7XG4gICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpWzFdLmlubmVyVGV4dCA9IGR1ZURhdGUudmFsdWU7XG5cbiAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB9KTtcbiAgICB0b2Rvcy5pbnNlcnRCZWZvcmUodG9kb0NvbnRhaW5lciwgdG9kb3MuY2hpbGRyZW5baW5kZXhdKTtcbiAgfSk7XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLXRvZG9zLWJnOiAjRTJFMkUyO1xcbiAgLS10b2Rvcy1mZzogIzI0MjkyRTtcXG4gIC0tdG9kb3MtZGl2aWRlcjogZ3JleTtcXG4gIC0tcHJvamVjdHMtYmc6ICNjNGM0YzQ7XFxuICAtLXByb2plY3RzLXNlbGVjdGVkLWJnOiByZ2IoMTQ2LCAxNDYsIDE0Nik7XFxuICAtLWRhc2hib2FyZC1kaXZpZGVyOiBibGFjaztcXG4gIC0tYnV0dG9ucy1ob3Zlci1iZzogI2FhYWFhYTtcXG4gIC0tdG9kby1ib3JkZXI6IHJnYigxMzMsIDEzMywgMTMzKTtcXG4gIC0tdG9kby1kYXRlLWdyZWVuOiBncmVlbjtcXG4gIC0tdG9kby10aXRsZS1iZzogdHJhbnNwYXJlbnQ7XFxuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xcbn1cXG5cXG46cm9vdC5saWdodCB7XFxuICAtLXRvZG9zLWJnOiAjRTJFMkUyO1xcbiAgLS10b2Rvcy1mZzogIzI0MjkyRTtcXG4gIC0tdG9kb3MtZGl2aWRlcjogZ3JleTtcXG4gIC0tcHJvamVjdHMtYmc6ICNjNGM0YzQ7XFxuICAtLXByb2plY3RzLXNlbGVjdGVkLWJnOiByZ2IoMTQ2LCAxNDYsIDE0Nik7XFxuICAtLWRhc2hib2FyZC1kaXZpZGVyOiBibGFjaztcXG4gIC0tYnV0dG9ucy1ob3Zlci1iZzogI2FhYWFhYTtcXG4gIC0tdG9kby1ib3JkZXI6IHJnYigxMzMsIDEzMywgMTMzKTtcXG4gIC0tdG9kby1kYXRlLWdyZWVuOiBncmVlbjtcXG4gIC0tdG9kby10aXRsZS1iZzogdHJhbnNwYXJlbnQ7XFxuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xcbn1cXG5cXG46cm9vdC5kYXJrIHtcXG4gIC0tdG9kb3MtYmc6ICMyNDI5MkU7XFxuICAtLXRvZG9zLWZnOiAjRTJFMkUyO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogIzFGMjQyODtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxMTIsIDExMiwgMTEyKTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjNDE0OTUwO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46ICM3MmZmNzI7XFxuICAtLXRvZG8tdGl0bGUtYmc6IHRyYW5zcGFyZW50O1xcbiAgY29sb3Itc2NoZW1lOiBkYXJrO1xcbn1cXG5cXG4jdG9kb3MtY29udGFpbmVyIGJ1dHRvbiwgI2FkZC1wcm9qZWN0LWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10b2Rvcy1kaXZpZGVyKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXFxuI3RvZG9zLWNvbnRhaW5lciBidXR0b246aG92ZXIsICNhZGQtcHJvamVjdC1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYnV0dG9ucy1ob3Zlci1iZyk7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcblxcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuXFxuLmRhc2hib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMzAwcHgsIDQwMHB4KTtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxufVxcblxcbmxpIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbnVsIHtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi5wcm9qZWN0cy1jb250YWluZXIge1xcbiAgLyogYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tZGFzaGJvYXJkLWRpdmlkZXIpOyAqL1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm9qZWN0cy1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgcGFkZGluZzogMnJlbTtcXG59XFxuXFxuLnByb2plY3RzLWNvbnRhaW5lciBsaSB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBtYXJnaW46IDAuNXJlbSAwIDAuNXJlbSAwO1xcbn1cXG5cXG4ucHJvamVjdHMgLnByb2plY3Qge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucHJvamVjdC5zZWxlY3RlZC1wcm9qZWN0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb2plY3RzLXNlbGVjdGVkLWJnKTtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuXFxuLnByb2plY3QtbWVudSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnByb2plY3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wcm9qZWN0LWJ1dHRvbnMgYnV0dG9uIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgcGFkZGluZzogMC41cmVtO1xcblxcbn1cXG5cXG4jZGVsZXRlLXByb2plY3Q6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5NywgNzcsIDc3KTtcXG59XFxuXFxuLmRlbGV0ZS1wcm9qZWN0IHtcXG4gIHdpZHRoOiAycmVtO1xcbiAgaGVpZ2h0OiAycmVtO1xcbn1cXG5cXG4jdG9kb3MtY29udGFpbmVyIHtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG9kb3MtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgcGFkZGluZy10b3A6IDEwdmg7XFxufVxcblxcbiNpbm5lci1wcm9qZWN0LXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG59XFxuXFxuI3RvZG9zIHtcXG4gIHdpZHRoOiA4MCU7XFxuICBtYXgtd2lkdGg6IDgwMHB4O1xcbn1cXG5cXG5saSAuY2hlY2tib3gge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJvamVjdHMtYmcpO1xcbn1cXG5cXG4udG9kby1zZWN0aW9uIHtcXG4gIHBhZGRpbmc6IDEuMXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDEuMXJlbTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10b2Rvcy1kaXZpZGVyKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdG9kby10aXRsZSwgI3RvZG8tZGVzY3JpcHRpb24ge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdG9kby1ib3JkZXIpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIHJlc2l6ZTogbm9uZTtcXG59XFxuXFxuI3RvZG8tYnV0dG9ucyB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4jdG9kby1idXR0b25zIGJ1dHRvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbiN0b2RvLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRvZG8tdGl0bGUtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGhlaWdodDogMjJweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbiN0b2RvLWJ1dHRvbnMgI3JlbW92ZS10YXNrLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk3LCA3NywgNzcpO1xcbn1cXG5cXG4jdG9kby1kZXNjcmlwdGlvbiB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10b2RvLXRpdGxlLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBoZWlnaHQ6IDVyZW07XFxufVxcblxcbiN0b2RvLXRpdGxlOmZvY3VzLCAjdG9kby1kZXNjcmlwdGlvbjpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4jdG9kb3MgbGkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxuICBwYWRkaW5nOiAxLjFyZW0gMCAxLjFyZW0gMS4xcmVtO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbn1cXG5cXG4jdG9kb3MgbGk6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jaGVja2JveCB7XFxuICB3aWR0aDogMS41cmVtO1xcbiAgaGVpZ2h0OiAxLjVyZW07XFxufVxcblxcbi5hZGQtdG9kbyB7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XFxufVxcblxcbi5jcmVhdGUtdG9kby1mb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdG9kby10aXRsZS1pbnB1dCB7XFxuICB3aWR0aDogMzByZW07XFxufVxcblxcbiN0b2RvLWRlc2NyaXB0aW9uLWlucHV0IHtcXG4gIGhlaWdodDogNXJlbTtcXG4gIHdpZHRoOiAzMHJlbTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFHQTtFQUNFLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLHNCQUFzQjtFQUN0QiwwQ0FBMEM7RUFDMUMsMEJBQTBCO0VBQzFCLDJCQUEyQjtFQUMzQixpQ0FBaUM7RUFDakMsd0JBQXdCO0VBQ3hCLDRCQUE0QjtFQUM1QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsMENBQTBDO0VBQzFDLDBCQUEwQjtFQUMxQiwyQkFBMkI7RUFDM0IsaUNBQWlDO0VBQ2pDLHdCQUF3QjtFQUN4Qiw0QkFBNEI7RUFDNUIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLDBDQUEwQztFQUMxQywwQkFBMEI7RUFDMUIsMkJBQTJCO0VBQzNCLGlDQUFpQztFQUNqQywwQkFBMEI7RUFDMUIsNEJBQTRCO0VBQzVCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixzQkFBc0I7RUFDdEIsc0NBQXNDO0VBQ3RDLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLFNBQVM7RUFDVCxxQkFBcUI7O0VBRXJCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiwyQ0FBMkM7RUFDM0MsYUFBYTtFQUNiLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLHNEQUFzRDtFQUN0RCxjQUFjO0VBQ2QsZUFBZTtFQUNmLG9DQUFvQztFQUNwQyxzQkFBc0I7RUFDdEIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSw2Q0FBNkM7RUFDN0Msa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixzQ0FBc0M7RUFDdEMsZUFBZTs7QUFFakI7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztFQUNkLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLGlDQUFpQztFQUNqQyxzQkFBc0I7RUFDdEIsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQiw2Q0FBNkM7RUFDN0MsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixvQ0FBb0M7RUFDcEMsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixZQUFZO0VBQ1osWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLHNDQUFzQztFQUN0QyxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLGVBQWU7RUFDZixzQ0FBc0M7RUFDdEMsc0JBQXNCO0VBQ3RCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsU0FBUztFQUNULCtCQUErQjtFQUMvQiw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtBQUNkXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90byZkaXNwbGF5PXN3YXAnKTtcXG5cXG5cXG46cm9vdCB7XFxuICAtLXRvZG9zLWJnOiAjRTJFMkUyO1xcbiAgLS10b2Rvcy1mZzogIzI0MjkyRTtcXG4gIC0tdG9kb3MtZGl2aWRlcjogZ3JleTtcXG4gIC0tcHJvamVjdHMtYmc6ICNjNGM0YzQ7XFxuICAtLXByb2plY3RzLXNlbGVjdGVkLWJnOiByZ2IoMTQ2LCAxNDYsIDE0Nik7XFxuICAtLWRhc2hib2FyZC1kaXZpZGVyOiBibGFjaztcXG4gIC0tYnV0dG9ucy1ob3Zlci1iZzogI2FhYWFhYTtcXG4gIC0tdG9kby1ib3JkZXI6IHJnYigxMzMsIDEzMywgMTMzKTtcXG4gIC0tdG9kby1kYXRlLWdyZWVuOiBncmVlbjtcXG4gIC0tdG9kby10aXRsZS1iZzogdHJhbnNwYXJlbnQ7XFxuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xcbn1cXG5cXG46cm9vdC5saWdodCB7XFxuICAtLXRvZG9zLWJnOiAjRTJFMkUyO1xcbiAgLS10b2Rvcy1mZzogIzI0MjkyRTtcXG4gIC0tdG9kb3MtZGl2aWRlcjogZ3JleTtcXG4gIC0tcHJvamVjdHMtYmc6ICNjNGM0YzQ7XFxuICAtLXByb2plY3RzLXNlbGVjdGVkLWJnOiByZ2IoMTQ2LCAxNDYsIDE0Nik7XFxuICAtLWRhc2hib2FyZC1kaXZpZGVyOiBibGFjaztcXG4gIC0tYnV0dG9ucy1ob3Zlci1iZzogI2FhYWFhYTtcXG4gIC0tdG9kby1ib3JkZXI6IHJnYigxMzMsIDEzMywgMTMzKTtcXG4gIC0tdG9kby1kYXRlLWdyZWVuOiBncmVlbjtcXG4gIC0tdG9kby10aXRsZS1iZzogdHJhbnNwYXJlbnQ7XFxuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xcbn1cXG5cXG46cm9vdC5kYXJrIHtcXG4gIC0tdG9kb3MtYmc6ICMyNDI5MkU7XFxuICAtLXRvZG9zLWZnOiAjRTJFMkUyO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogIzFGMjQyODtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxMTIsIDExMiwgMTEyKTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjNDE0OTUwO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46ICM3MmZmNzI7XFxuICAtLXRvZG8tdGl0bGUtYmc6IHRyYW5zcGFyZW50O1xcbiAgY29sb3Itc2NoZW1lOiBkYXJrO1xcbn1cXG5cXG4jdG9kb3MtY29udGFpbmVyIGJ1dHRvbiwgI2FkZC1wcm9qZWN0LWJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10b2Rvcy1kaXZpZGVyKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG59XFxuXFxuI3RvZG9zLWNvbnRhaW5lciBidXR0b246aG92ZXIsICNhZGQtcHJvamVjdC1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYnV0dG9ucy1ob3Zlci1iZyk7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcblxcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuXFxuLmRhc2hib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMzAwcHgsIDQwMHB4KTtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxufVxcblxcbmxpIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbnVsIHtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi5wcm9qZWN0cy1jb250YWluZXIge1xcbiAgLyogYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tZGFzaGJvYXJkLWRpdmlkZXIpOyAqL1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxuICBncmlkLXJvdzogMSAvIDI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm9qZWN0cy1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgcGFkZGluZzogMnJlbTtcXG59XFxuXFxuLnByb2plY3RzLWNvbnRhaW5lciBsaSB7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBtYXJnaW46IDAuNXJlbSAwIDAuNXJlbSAwO1xcbn1cXG5cXG4ucHJvamVjdHMgLnByb2plY3Qge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ucHJvamVjdC5zZWxlY3RlZC1wcm9qZWN0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb2plY3RzLXNlbGVjdGVkLWJnKTtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG59XFxuXFxuLnByb2plY3QtbWVudSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnByb2plY3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5wcm9qZWN0LWJ1dHRvbnMgYnV0dG9uIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgcGFkZGluZzogMC41cmVtO1xcblxcbn1cXG5cXG4jZGVsZXRlLXByb2plY3Q6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5NywgNzcsIDc3KTtcXG59XFxuXFxuLmRlbGV0ZS1wcm9qZWN0IHtcXG4gIHdpZHRoOiAycmVtO1xcbiAgaGVpZ2h0OiAycmVtO1xcbn1cXG5cXG4jdG9kb3MtY29udGFpbmVyIHtcXG4gIGdyaWQtY29sdW1uOiAyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG9kb3MtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgcGFkZGluZy10b3A6IDEwdmg7XFxufVxcblxcbiNpbm5lci1wcm9qZWN0LXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG59XFxuXFxuI3RvZG9zIHtcXG4gIHdpZHRoOiA4MCU7XFxuICBtYXgtd2lkdGg6IDgwMHB4O1xcbn1cXG5cXG5saSAuY2hlY2tib3gge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJvamVjdHMtYmcpO1xcbn1cXG5cXG4udG9kby1zZWN0aW9uIHtcXG4gIHBhZGRpbmc6IDEuMXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDEuMXJlbTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10b2Rvcy1kaXZpZGVyKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdG9kby10aXRsZSwgI3RvZG8tZGVzY3JpcHRpb24ge1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdG9kby1ib3JkZXIpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIHJlc2l6ZTogbm9uZTtcXG59XFxuXFxuI3RvZG8tYnV0dG9ucyB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4jdG9kby1idXR0b25zIGJ1dHRvbiB7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbiN0b2RvLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRvZG8tdGl0bGUtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGhlaWdodDogMjJweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbiN0b2RvLWJ1dHRvbnMgI3JlbW92ZS10YXNrLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk3LCA3NywgNzcpO1xcbn1cXG5cXG4jdG9kby1kZXNjcmlwdGlvbiB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10b2RvLXRpdGxlLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBoZWlnaHQ6IDVyZW07XFxufVxcblxcbiN0b2RvLXRpdGxlOmZvY3VzLCAjdG9kby1kZXNjcmlwdGlvbjpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4jdG9kb3MgbGkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxuICBwYWRkaW5nOiAxLjFyZW0gMCAxLjFyZW0gMS4xcmVtO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbn1cXG5cXG4jdG9kb3MgbGk6aG92ZXIge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jaGVja2JveCB7XFxuICB3aWR0aDogMS41cmVtO1xcbiAgaGVpZ2h0OiAxLjVyZW07XFxufVxcblxcbi5hZGQtdG9kbyB7XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XFxufVxcblxcbi5jcmVhdGUtdG9kby1mb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdG9kby10aXRsZS1pbnB1dCB7XFxuICB3aWR0aDogMzByZW07XFxufVxcblxcbiN0b2RvLWRlc2NyaXB0aW9uLWlucHV0IHtcXG4gIGhlaWdodDogNXJlbTtcXG4gIHdpZHRoOiAzMHJlbTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiY3JlYXRlRGVtbyIsImFkZE5ld1Byb2plY3QiLCJkaXNwbGF5UHJvamVjdCIsInN3aXRjaFByb2plY3QiLCJhZGROZXdUb2RvIiwib3BlblRvZG8iLCJkaXNwbGF5VG9kbyIsImRhc2hib2FyZCIsImNvbnRlbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwcm9qZWN0c0NvbnRhaW5lciIsInNpZGViYXIiLCJ0b2Rvc0NvbnRhaW5lciIsInRvZG9zIiwidGhlbWVUb2dnbGUiLCJpbm5lckhUTUwiLCJkZW1vQWNjb3VudCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFByb2plY3QiLCJwcm9qZWN0cyIsImFkZFByb2plY3QiLCJjbGFzc05hbWUiLCJpZCIsInRvZG8iLCJhcHBlbmQiLCJhZGRFdmVudExpc3RlbmVyIiwicm9vdCIsImRvY3VtZW50RWxlbWVudCIsIm5ld1RoZW1lIiwicXVlcnlTZWxlY3RvciIsInByb2plY3QiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcm9qZWN0VGl0bGUiLCJmaXJzdENoaWxkIiwiYmVmb3JlIiwiYm9keSIsImFjY291bnQiLCJuYW1lIiwicHVzaCIsInRpdGxlIiwiYWRkVG9kbyIsImRlc2NyaXB0aW9uIiwiZHVlRGF0ZSIsIkRhdGUiLCJjb21wbGV0ZWQiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwidG9TdHJpbmciLCJwYWRTdGFydCIsImdldERhdGUiLCJqb2luIiwiaW5ib3giLCJ3ZWJzaXRlIiwibXlUb2RvIiwiY29tcGxldGVkVG9kbyIsImhhbGZGaWxsZWRUb2RvIiwibXlUb2RvMSIsIndlYnNpdGVUb2RvIiwid2Vic2l0ZVRvZG8xIiwiY3VycmVudEFjY291bnQiLCJwcm9qZWN0RGlzcGxheSIsIm1lbnUiLCJlIiwicHJvamVjdE1lbnUiLCJjb250YWlucyIsInJlbW92ZUNoaWxkIiwicHJvamVjdElucHV0IiwicHJvamVjdFN1Ym1pdCIsInZhbHVlIiwibmV3UHJvamVjdCIsImFwcGVuZENoaWxkIiwiZXZlbnQiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsImdldEVsZW1lbnRCeUlkIiwiY2xpY2siLCJwcm9qZWN0RWxlbWVudCIsInByb2plY3ROb2RlcyIsIkFycmF5IiwiZnJvbSIsImNoaWxkcmVuIiwidGFyZ2V0IiwidGFnTmFtZSIsInJlbW92ZSIsImluZGV4IiwiaW5kZXhPZiIsIm5vZGVzIiwicHJvamVjdFRpdGxlSW5wdXQiLCJidXR0b25zQ29udGFpbmVyIiwiZG9uZUJ1dHRvbiIsImRlbGV0ZUJ1dHRvbiIsInBhcmVudEVsZW1lbnQiLCJzcGxpY2UiLCJpIiwibGFzdENoaWxkIiwicmVzdWx0UHJvamVjdERpc3BsYXkiLCJ0b2RvRGlzcGxheSIsInRvZG9UaXRsZSIsImNoZWNrYm94IiwidG9kb0RhdGUiLCJzZXRBdHRyaWJ1dGUiLCJjdXJyZW50RGF0ZSIsInN0eWxlIiwiY29sb3IiLCJjaGVja2VkIiwidGV4dERlY29yYXRpb24iLCJjcmVhdGVUb2RvQ29udGFpbmVyIiwidG9kb1RpdGxlTGFiZWwiLCJ0b2RvSW5wdXRUaXRsZSIsInRvZG9EZXNjcmlwdGlvbkxhYmVsIiwidG9kb0lucHV0RGVzY3JpcHRpb24iLCJ0b2RvSW5wdXREYXRlIiwidG9kb1N1Ym1pdCIsImZvciIsIm5ld1RvZG9UaXRsZSIsIm5ld1RvZG9EZXNjcmlwdGlvbiIsIm5ld1RvZG9EYXRlIiwibmV3VG9kbyIsImRpc3BsYXkiLCJ0b2RvQ29udGFpbmVyIiwicmVtb3ZlQnV0dG9uIiwiaW5uZXJUZXh0IiwiaW5zZXJ0QmVmb3JlIl0sInNvdXJjZVJvb3QiOiIifQ==