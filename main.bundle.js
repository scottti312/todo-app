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
  themeToggle.innerHTML = 'Toggle Theme';
  let {
    demoAccount,
    inbox
  } = (0,_logic_js__WEBPACK_IMPORTED_MODULE_0__.createDemo)();
  let currentProject = inbox;
  demoAccount = JSON.parse(localStorage.getItem('user'));
  currentProject = demoAccount.projects[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxxR0FBcUcsYUFBYSx3QkFBd0Isd0JB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O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvZGFzaGJvYXJkLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3RvZG9zLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZURlbW8gfSBmcm9tICcuL2xvZ2ljLmpzJztcbmltcG9ydCB7IGFkZE5ld1Byb2plY3QsIGRpc3BsYXlQcm9qZWN0LCBzd2l0Y2hQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBhZGROZXdUb2RvLCBvcGVuVG9kbywgZGlzcGxheVRvZG8gfSBmcm9tICcuL3RvZG9zLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhc2hib2FyZCgpIHtcbiAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBzaWRlYmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbGV0IHRvZG9zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCB0b2RvcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGxldCB0aGVtZVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICB0aGVtZVRvZ2dsZS5pbm5lckhUTUwgPSAnVG9nZ2xlIFRoZW1lJztcblxuICBsZXQgeyBkZW1vQWNjb3VudCwgaW5ib3ggfSA9IGNyZWF0ZURlbW8oKTtcbiAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gaW5ib3g7XG5cbiAgZGVtb0FjY291bnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICBjdXJyZW50UHJvamVjdCA9IGRlbW9BY2NvdW50LnByb2plY3RzWzBdO1xuXG4gIGxldCBhZGRQcm9qZWN0ID0gYWRkTmV3UHJvamVjdChzaWRlYmFyLCBkZW1vQWNjb3VudCwgdG9kb3MpO1xuICBwcm9qZWN0c0NvbnRhaW5lci5jbGFzc05hbWUgPSAncHJvamVjdHMtY29udGFpbmVyJztcbiAgc2lkZWJhci5jbGFzc05hbWUgPSAncHJvamVjdHMnO1xuICB0b2Rvc0NvbnRhaW5lci5pZCA9ICd0b2Rvcy1jb250YWluZXInO1xuICB0b2Rvcy5pZCA9ICd0b2Rvcyc7XG5cbiAgZm9yIChjb25zdCB0b2RvIG9mIGN1cnJlbnRQcm9qZWN0LnRvZG9zKSB7XG4gICAgZGlzcGxheVRvZG8odG9kbywgdG9kb3MsIGRlbW9BY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gIH1cbiAgdG9kb3MuYXBwZW5kKGFkZE5ld1RvZG8oY3VycmVudFByb2plY3QsIHRvZG9zLCBkZW1vQWNjb3VudCkpO1xuXG4gIHRoZW1lVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3QgbmV3VGhlbWUgPSByb290LmNsYXNzTmFtZSA9PT0gJ2RhcmsnID8gJ2xpZ2h0JyA6ICdkYXJrJztcbiAgICByb290LmNsYXNzTmFtZSA9IG5ld1RoZW1lO1xuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5zZXRBdHRyaWJ1dGUoJ2NvbG9yLXNjaGVtZScsICdsaWdodCcpO1xuICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSk7XG4gIH0pXG5cbiAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kKHRoZW1lVG9nZ2xlKTtcbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGRlbW9BY2NvdW50LnByb2plY3RzKSB7XG4gICAgc2lkZWJhci5hcHBlbmQoZGlzcGxheVByb2plY3QocHJvamVjdCwgc2lkZWJhciwgZGVtb0FjY291bnQsIHRvZG9zKSk7XG4gIH1cbiAgc2lkZWJhci5xdWVyeVNlbGVjdG9yKCdsaScpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLXByb2plY3QnKTtcblxuICBzaWRlYmFyLmFwcGVuZChhZGRQcm9qZWN0KTtcbiAgdG9kb3NDb250YWluZXIuYXBwZW5kKHRvZG9zKTtcbiAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kKHNpZGViYXIpO1xuICBjb250ZW50LmNsYXNzTmFtZSA9ICdkYXNoYm9hcmQnO1xuICBjb250ZW50LmFwcGVuZChwcm9qZWN0c0NvbnRhaW5lcik7XG4gIGNvbnRlbnQuYXBwZW5kKHRvZG9zQ29udGFpbmVyKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShkZW1vQWNjb3VudCkpO1xuXG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiB0b2Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgb3BlblRvZG8oZWxlbWVudCwgdG9kb3MsIGRlbW9BY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2Ygc2lkZWJhci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgc3dpdGNoUHJvamVjdChlbGVtZW50LCBzaWRlYmFyLCB0b2RvcywgZGVtb0FjY291bnQpO1xuICB9XG5cbiAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcm9qZWN0VGl0bGUuaWQgPSAnaW5uZXItcHJvamVjdC10aXRsZSc7XG4gIHByb2plY3RUaXRsZS5pbm5lckhUTUwgPSBzaWRlYmFyLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5pbm5lckhUTUw7XG4gIHRvZG9zLmJlZm9yZShwcm9qZWN0VGl0bGUpO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tICcuL2Rhc2hib2FyZC5qcyc7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kKGRhc2hib2FyZCgpKTtcblxuIiwiZXhwb3J0IGZ1bmN0aW9uIGFjY291bnQobmFtZSkge1xuICBsZXQgcHJvamVjdHMgPSBbXTtcbiAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgfVxuICByZXR1cm4geyBhZGRQcm9qZWN0LCBwcm9qZWN0cywgbmFtZSB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0KHRpdGxlKSB7XG4gIGxldCB0b2RvcyA9IFtdO1xuICBmdW5jdGlvbiBhZGRUb2RvKHRvZG8pIHtcbiAgICB0b2Rvcy5wdXNoKHRvZG8pO1xuICB9XG4gIHJldHVybiB7IGFjY291bnQsIGFkZFRvZG8sIHRvZG9zLCB0aXRsZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9kbyh0aXRsZSA9ICdUb2RvIFRpdGxlJywgZGVzY3JpcHRpb24gPSAnVG9kbyBEZXNjcmlwdGlvbicsIGR1ZURhdGUgPSBuZXcgRGF0ZSgpLCBjb21wbGV0ZWQgPSBmYWxzZSkge1xuICBpZiAodHlwZW9mIGR1ZURhdGUgPT0gJ29iamVjdCcpIHtcbiAgICBkdWVEYXRlID0gW1xuICAgICAgZHVlRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgKGR1ZURhdGUuZ2V0TW9udGgoKSsxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyksXG4gICAgICAoZHVlRGF0ZS5nZXREYXRlKCkpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSxcbiAgICBdLmpvaW4oJy0nKTtcbiAgfVxuICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGNvbXBsZXRlZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVtbygpIHtcbiAgY29uc3QgZGVtb0FjY291bnQgPSBhY2NvdW50KCdEZW1vbWFuJyk7XG4gIGNvbnN0IGluYm94ID0gcHJvamVjdCgnSW5ib3gnKTtcbiAgY29uc3Qgd2Vic2l0ZSA9IHByb2plY3QoJ015IHdlYnNpdGUgcHJvamVjdCcpO1xuICBjb25zdCBteVRvZG8gPSB0b2RvKCdFeGFtcGxlIFRvZG8nLCAnSGVyZSBpcyBhbiBleGFtcGxlIGRlc2NyaXB0aW9uJywgbmV3IERhdGUoKSwgZmFsc2UpO1xuICBjb25zdCBjb21wbGV0ZWRUb2RvID0gdG9kbygnQ29tcGxldGVkIFRvZG8nLCAnSGVyZSBpcyBhbiBleGFtcGxlIG9mIGEgY29tcGxldGVkIHRvZG8nLCBuZXcgRGF0ZSgpLCB0cnVlKTtcbiAgY29uc3QgaGFsZkZpbGxlZFRvZG8gPSB0b2RvKCdIYWxmIFRvZG8nLCAnRGVzY3JpcHRpb24gYW5kIG5vIGRhdGUgb3IgY29tcGxldGVkIHZhbHVlJywgbmV3IERhdGUoKSwgZmFsc2UpO1xuICBjb25zdCBteVRvZG8xID0gdG9kbygpO1xuICBjb25zdCB3ZWJzaXRlVG9kbyA9IHRvZG8oJ0FkZCBkaXZzJywgJ0FkZCBzdGFydGluZyBkaXZzIHRvIG15IHdlYnNpdGUnLCBuZXcgRGF0ZSgpLCBmYWxzZSk7XG4gIGNvbnN0IHdlYnNpdGVUb2RvMSA9IHRvZG8oJ1N0eWxlIGRpdnMnLCAnU3R5bGUgbXkgZGl2cyB0byBtYWtlIHRoZW0gbG9vayBuaWNlLicsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgXG4gIGRlbW9BY2NvdW50LmFkZFByb2plY3QoaW5ib3gpO1xuICBkZW1vQWNjb3VudC5hZGRQcm9qZWN0KHdlYnNpdGUpO1xuICBpbmJveC5hZGRUb2RvKGNvbXBsZXRlZFRvZG8pO1xuICBpbmJveC5hZGRUb2RvKG15VG9kbyk7XG4gIGluYm94LmFkZFRvZG8obXlUb2RvMSk7XG4gIGluYm94LmFkZFRvZG8oaGFsZkZpbGxlZFRvZG8pO1xuICB3ZWJzaXRlLmFkZFRvZG8od2Vic2l0ZVRvZG8pO1xuICB3ZWJzaXRlLmFkZFRvZG8od2Vic2l0ZVRvZG8xKTtcbiAgcmV0dXJuIHsgZGVtb0FjY291bnQsIGluYm94IH1cbn1cbiIsImltcG9ydCB7ZGlzcGxheVRvZG8sIGFkZE5ld1RvZG8sIG9wZW5Ub2RvfSBmcm9tICcuL3RvZG9zLmpzJztcbmltcG9ydCB7cHJvamVjdH0gZnJvbSAnLi9sb2dpYy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UHJvamVjdChwcm9qZWN0LCBzaWRlYmFyLCBjdXJyZW50QWNjb3VudCwgdG9kb3MpIHtcbiAgbGV0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIHByb2plY3RUaXRsZS5pZCA9ICdwcm9qZWN0LW5hbWUnO1xuICBwcm9qZWN0RGlzcGxheS5jbGFzc05hbWUgPSAncHJvamVjdCc7XG4gIHByb2plY3RUaXRsZS5pbm5lckhUTUwgPSBwcm9qZWN0LnRpdGxlO1xuXG4gIGxldCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICBtZW51LmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XG4gIG1lbnUuY2xhc3NMaXN0LmFkZCgnZmEtZWxsaXBzaXMnKTtcbiAgbWVudS5jbGFzc0xpc3QuYWRkKCdmYS14bCcpO1xuICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBwcm9qZWN0TWVudShlLCBwcm9qZWN0RGlzcGxheSwgcHJvamVjdFRpdGxlLCBtZW51LCBcbiAgICAgICAgICAgICAgICBzaWRlYmFyLCBwcm9qZWN0LCBjdXJyZW50QWNjb3VudCwgdG9kb3MpO1xuICB9KTtcbiAgcHJvamVjdERpc3BsYXkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgIGlmICghcHJvamVjdERpc3BsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LW1lbnUnKSlcbiAgICAgIHByb2plY3REaXNwbGF5LmFwcGVuZChtZW51KTtcbiAgfSk7XG4gIHByb2plY3REaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgIGlmICghcHJvamVjdERpc3BsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LW1lbnUnKSlcbiAgICBwcm9qZWN0RGlzcGxheS5yZW1vdmVDaGlsZChtZW51KVxuICB9KTtcbiAgcHJvamVjdERpc3BsYXkuYXBwZW5kKHByb2plY3RUaXRsZSk7XG4gIHJldHVybiBwcm9qZWN0RGlzcGxheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ld1Byb2plY3QocHJvamVjdHMsIGN1cnJlbnRBY2NvdW50LCB0b2Rvcykge1xuICBsZXQgYWRkUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBhZGRQcm9qZWN0LmlubmVySFRNTCA9ICdBZGQgbmV3IHByb2plY3QnO1xuICBhZGRQcm9qZWN0LmlkID0gJ2FkZC1wcm9qZWN0LWJ1dHRvbic7XG4gIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQoYWRkUHJvamVjdCk7XG4gICAgbGV0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGV0IHByb2plY3RTdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwcm9qZWN0U3VibWl0LmlubmVySFRNTCA9ICdTdWJtaXQnO1xuICAgIHByb2plY3RTdWJtaXQuaWQgPSAnc3VibWl0JztcbiAgICBwcm9qZWN0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHByb2plY3RJbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3QocHJvamVjdElucHV0LnZhbHVlKTtcbiAgICAgICAgY3VycmVudEFjY291bnQucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgICAgICBsZXQgcHJvamVjdERpc3BsYXkgPSBkaXNwbGF5UHJvamVjdChuZXdQcm9qZWN0LCBwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKTtcbiAgICAgICAgcHJvamVjdHMuYXBwZW5kKHByb2plY3REaXNwbGF5LCBhZGRQcm9qZWN0KTtcbiAgICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdElucHV0KTtcbiAgICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdFN1Ym1pdCk7XG5cbiAgICAgICAgc3dpdGNoUHJvamVjdChwcm9qZWN0RGlzcGxheSwgcHJvamVjdHMsIHRvZG9zLCBjdXJyZW50QWNjb3VudCk7XG4gICAgICB9XG4gICAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChwcm9qZWN0SW5wdXQpO1xuICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdFN1Ym1pdCk7XG4gICAgICBwcm9qZWN0cy5hcHBlbmRDaGlsZChhZGRQcm9qZWN0KTtcbiAgICB9KTtcbiAgICBwcm9qZWN0cy5hcHBlbmQocHJvamVjdElucHV0KTtcbiAgICBwcm9qZWN0cy5hcHBlbmQocHJvamVjdFN1Ym1pdCk7XG4gICAgcHJvamVjdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JykuY2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhZGRQcm9qZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoUHJvamVjdChwcm9qZWN0RWxlbWVudCwgcHJvamVjdHMsIHRvZG9zLCBjdXJyZW50QWNjb3VudCkge1xuICAvLyBDbGljayBvbiBwcm9qZWN0cyB0byBzd2l0Y2ggY3VycmVudFByb2plY3RcbiAgdmFyIHByb2plY3ROb2RlcyA9IEFycmF5LmZyb20ocHJvamVjdHMuY2hpbGRyZW4pO1xuICBwcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7IFxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnRElWJykge1xuICAgICAgdGFyZ2V0ID0gcHJvamVjdEVsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnSScpIHtcbiAgICAgIHRhcmdldCA9IHByb2plY3RFbGVtZW50O1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgIHByb2plY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtcHJvamVjdCcpO1xuICAgIH1cbiAgICBwcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1wcm9qZWN0Jyk7XG5cbiAgICBsZXQgaW5kZXggPSBwcm9qZWN0Tm9kZXMuaW5kZXhPZih0YXJnZXQpO1xuICAgIHdoaWxlKHRvZG9zLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb3MuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGxldCBjdXJyZW50UHJvamVjdCA9IGN1cnJlbnRBY2NvdW50LnByb2plY3RzW2luZGV4XTtcblxuICAgIC8vIEFkZCBwcm9qZWN0IHRpdGxlIHRvIHRoZSB0b3Agb2YgdGhlIHRvZG8gbGlzdFxuICAgIGxldCB0b2Rvc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2Rvcy1jb250YWluZXInKTtcbiAgICBpZiAodG9kb3NDb250YWluZXIuY29udGFpbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lubmVyLXByb2plY3QtdGl0bGUnKSkpIHtcbiAgICAgIHRvZG9zQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRvZG9zQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBsZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdFRpdGxlLmlkID0gJ2lubmVyLXByb2plY3QtdGl0bGUnO1xuICAgIGlmIChwcm9qZWN0RWxlbWVudC5maXJzdENoaWxkLnRhZ05hbWUgPT0gJ0RJVicpXG4gICAgICBwcm9qZWN0VGl0bGUuaW5uZXJIVE1MID0gcHJvamVjdEVsZW1lbnQuZmlyc3RDaGlsZC5pbm5lckhUTUw7XG4gICAgaWYgKHByb2plY3RFbGVtZW50LmZpcnN0Q2hpbGQudGFnTmFtZSA9PSAnSU5QVVQnKVxuICAgICAgcHJvamVjdFRpdGxlLmlubmVySFRNTCA9IHByb2plY3RFbGVtZW50LmZpcnN0Q2hpbGQudmFsdWU7XG4gICAgdG9kb3MuYmVmb3JlKHByb2plY3RUaXRsZSlcblxuICAgIGZvciAoY29uc3QgdG9kbyBvZiBjdXJyZW50UHJvamVjdC50b2Rvcykge1xuICAgICAgZGlzcGxheVRvZG8odG9kbywgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0b2Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICBvcGVuVG9kbyhlbGVtZW50LCB0b2RvcywgY3VycmVudEFjY291bnQsIGN1cnJlbnRQcm9qZWN0KTtcbiAgICB9XG4gICAgdG9kb3MuYXBwZW5kKGFkZE5ld1RvZG8oY3VycmVudFByb2plY3QsIHRvZG9zLCBjdXJyZW50QWNjb3VudCkpO1xuICAgIHJldHVybiBpbmRleDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0TWVudShlLCBwcm9qZWN0RGlzcGxheSwgcHJvamVjdFRpdGxlLCBtZW51LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RzLCBwcm9qZWN0LCBjdXJyZW50QWNjb3VudCwgdG9kb3MpIHtcbiAgdmFyIG5vZGVzID0gQXJyYXkuZnJvbShwcm9qZWN0cy5jaGlsZHJlbik7XG4gIGxldCBwcm9qZWN0VGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGxldCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBkb25lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgbGV0IGluZGV4ID0gbm9kZXMuaW5kZXhPZihlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LW1lbnUnKTtcbiAgZGVsZXRlQnV0dG9uLmlkID0gJ2RlbGV0ZS1wcm9qZWN0JztcbiAgZG9uZUJ1dHRvbi5pZCA9ICdzdWJtaXQtcHJvamVjdCc7XG4gIGRvbmVCdXR0b24uaW5uZXJIVE1MID0gJ0RvbmUnO1xuICBkZWxldGVCdXR0b24uaW5uZXJIVE1MID0gJ0RlbGV0ZSc7XG4gIGJ1dHRvbnNDb250YWluZXIuY2xhc3NOYW1lID0gJ3Byb2plY3QtYnV0dG9ucyc7XG4gIHByb2plY3RUaXRsZUlucHV0LnZhbHVlID0gcHJvamVjdC50aXRsZTtcbiAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQoZGVsZXRlQnV0dG9uLCBkb25lQnV0dG9uKTtcbiAgcHJvamVjdERpc3BsYXkucmVtb3ZlQ2hpbGQocHJvamVjdFRpdGxlKTtcbiAgcHJvamVjdERpc3BsYXkucmVtb3ZlQ2hpbGQobWVudSk7XG4gIHByb2plY3REaXNwbGF5LmFwcGVuZChwcm9qZWN0VGl0bGVJbnB1dCwgYnV0dG9uc0NvbnRhaW5lcik7XG5cbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjdXJyZW50QWNjb3VudC5wcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3REaXNwbGF5KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgbGV0IGkgPSAwO1xuICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3RzLmxhc3RDaGlsZCk7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgcHJvamVjdHMuYXBwZW5kKGRpc3BsYXlQcm9qZWN0KGN1cnJlbnRBY2NvdW50LnByb2plY3RzW2ldLCBwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKSk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwcm9qZWN0cy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICBjb25zb2xlLmxvZygnZnVjaycpO1xuICAgICAgc3dpdGNoUHJvamVjdChlbGVtZW50LCBwcm9qZWN0cywgdG9kb3MsIGN1cnJlbnRBY2NvdW50KTtcbiAgICB9XG4gICAgcHJvamVjdHMuYXBwZW5kQ2hpbGQoYWRkTmV3UHJvamVjdChwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKSk7XG4gIH0pO1xuXG4gIGRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKHByb2plY3RUaXRsZUlucHV0LnZhbHVlICE9ICcnKSB7XG4gICAgICBjdXJyZW50QWNjb3VudC5wcm9qZWN0c1tpbmRleF0udGl0bGUgPSBwcm9qZWN0VGl0bGVJbnB1dC52YWx1ZTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICB9XG4gICAgICBsZXQgcmVzdWx0UHJvamVjdERpc3BsYXkgPSBkaXNwbGF5UHJvamVjdChwcm9qZWN0LCBwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKTtcbiAgICAgIGlmIChwcm9qZWN0RGlzcGxheS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkLXByb2plY3QnKSlcbiAgICAgICAgcmVzdWx0UHJvamVjdERpc3BsYXkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtcHJvamVjdCcpO1xuICAgICAgcHJvamVjdERpc3BsYXkuYmVmb3JlKHJlc3VsdFByb2plY3REaXNwbGF5KTtcbiAgICAgIHN3aXRjaFByb2plY3QocmVzdWx0UHJvamVjdERpc3BsYXksIHByb2plY3RzLCB0b2RvcywgY3VycmVudEFjY291bnQpO1xuICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdERpc3BsYXkpO1xuICB9KTtcblxuICBwcm9qZWN0VGl0bGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PSAnRW50ZXInKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1wcm9qZWN0JykuY2xpY2soKTtcbiAgICB9XG4gIH0pOyBcblxufSIsImltcG9ydCB7IHRvZG8gfSBmcm9tICcuL2xvZ2ljLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlUb2RvKHRvZG8sIHRvZG9zLCBjdXJyZW50QWNjb3VudCkge1xuICBsZXQgdG9kb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBsZXQgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGxldCB0b2RvRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgdG9kb1RpdGxlLmlkID0gJ3RvZG9saXN0LXRvZG8tdGl0bGUnO1xuICB0b2RvRGF0ZS5pZCA9ICd0b2RvLWRhdGUnO1xuICB0b2RvVGl0bGUuaW5uZXJIVE1MID0gdG9kby50aXRsZTtcbiAgdG9kb0RhdGUuaW5uZXJIVE1MID0gdG9kby5kdWVEYXRlO1xuXG4gIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGN1cnJlbnREYXRlID0gW2N1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgIChjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpLFxuICAgICAgICAgICAgICAgICAoY3VycmVudERhdGUuZ2V0RGF0ZSgpKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyksXG4gICAgICAgICAgICAgICAgXS5qb2luKCctJyk7XG4gIGlmICh0b2RvLmR1ZURhdGUgPT0gY3VycmVudERhdGUpIHtcbiAgICB0b2RvRGF0ZS5zdHlsZS5jb2xvciA9ICd2YXIoLS10b2RvLWRhdGUtZ3JlZW4pJztcbiAgfVxuICB0b2RvRGlzcGxheS5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gIHRvZG9EaXNwbGF5LmFwcGVuZENoaWxkKHRvZG9UaXRsZSk7XG4gIHRvZG9EaXNwbGF5LmFwcGVuZENoaWxkKHRvZG9EYXRlKTtcbiAgaWYgKHRvZG8uY29tcGxldGVkKSB7XG4gICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgdG9kb0Rpc3BsYXkuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbGluZS10aHJvdWdoJztcbiAgfVxuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICB0b2RvLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICB0b2RvRGlzcGxheS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdsaW5lLXRocm91Z2gnO1xuICAgICAgY29uc29sZS5sb2coY3VycmVudEFjY291bnQpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2RvLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgdG9kb0Rpc3BsYXkuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbm9uZSc7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgfVxuICB9KTtcbiAgdG9kb3MuYXBwZW5kKHRvZG9EaXNwbGF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ld1RvZG8oY3VycmVudFByb2plY3QsIHRvZG9zLCBjdXJyZW50QWNjb3VudCkge1xuICBsZXQgYWRkVG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBhZGRUb2RvLmNsYXNzTmFtZSA9ICdhZGQtdG9kbyc7XG4gIGFkZFRvZG8uaW5uZXJIVE1MID0gJ0FkZCBuZXcgdGFzayc7XG4gIGFkZFRvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgdG9kb3MucmVtb3ZlQ2hpbGQoYWRkVG9kbyk7XG4gICAgbGV0IGNyZWF0ZVRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgdG9kb1RpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxldCB0b2RvSW5wdXRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGV0IHRvZG9EZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsZXQgdG9kb0lucHV0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIGxldCB0b2RvSW5wdXREYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsZXQgdG9kb1N1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGxldCB0b2RvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGV0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgdG9kb1RpdGxlTGFiZWwuaW5uZXJIVE1MID0gJ1RpdGxlJztcbiAgICB0b2RvVGl0bGVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICd0b2RvLXRpdGxlLWlucHV0Jyk7XG4gICAgdG9kb0Rlc2NyaXB0aW9uTGFiZWwuaW5uZXJIVE1MID0gJ0Rlc2NyaXB0aW9uJztcbiAgICB0b2RvRGVzY3JpcHRpb25MYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICd0b2RvLWRlc2NyaXB0aW9uLWlucHV0Jyk7XG4gICAgdG9kb0Rlc2NyaXB0aW9uTGFiZWwuZm9yID0gJ3RvZG8tZGVzY3JpcHRpb24taW5wdXQnO1xuICAgIGNyZWF0ZVRvZG9Db250YWluZXIuY2xhc3NOYW1lID0gJ2NyZWF0ZS10b2RvLWZvcm0nO1xuICAgIHRvZG9JbnB1dFRpdGxlLmlkID0gJ3RvZG8tdGl0bGUtaW5wdXQnO1xuICAgIHRvZG9JbnB1dERlc2NyaXB0aW9uLmlkID0gJ3RvZG8tZGVzY3JpcHRpb24taW5wdXQnO1xuICAgIHRvZG9JbnB1dERlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29sdW1uJywgODApO1xuICAgIHRvZG9JbnB1dERlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgncm93JywgMyk7XG4gICAgdG9kb1N1Ym1pdC5pbm5lckhUTUwgPSAnU3VibWl0JztcbiAgICB0b2RvU3VibWl0LmlkID0gJ3N1Ym1pdCc7XG4gICAgdG9kb0lucHV0RGF0ZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZGF0ZScpO1xuXG4gICAgdG9kb1N1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0b2RvSW5wdXRUaXRsZS52YWx1ZSAhPSAnJykge1xuICAgICAgICBsZXQgbmV3VG9kb1RpdGxlID0gdG9kb0lucHV0VGl0bGUudmFsdWU7XG4gICAgICAgIGxldCBuZXdUb2RvRGVzY3JpcHRpb24gPSB0b2RvSW5wdXREZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgbGV0IG5ld1RvZG9EYXRlID0gdG9kb0lucHV0RGF0ZS52YWx1ZTtcbiAgICAgICAgaWYgKHRvZG9JbnB1dERlc2NyaXB0aW9uLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgbmV3VG9kb0Rlc2NyaXB0aW9uID0gJ0VtcHR5JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3VG9kbyA9IHRvZG8obmV3VG9kb1RpdGxlLCBuZXdUb2RvRGVzY3JpcHRpb24sIG5ld1RvZG9EYXRlLCBmYWxzZSk7XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zLnB1c2gobmV3VG9kbyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgICAgdG9kb1RpdGxlLmlubmVySFRNTCA9IG5ld1RvZG8udGl0bGU7XG4gICAgICAgIHRvZG9EaXNwbGF5LmFwcGVuZChjaGVja2JveCwgdG9kb1RpdGxlKTtcbiAgICAgICAgLy8gdG9kb3MuYXBwZW5kKHRvZG9EaXNwbGF5KTtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQoY3JlYXRlVG9kb0NvbnRhaW5lcik7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9TdWJtaXQpO1xuICAgICAgICBkaXNwbGF5VG9kbyhuZXdUb2RvLCB0b2RvcywgY3VycmVudEFjY291bnQpO1xuXG4gICAgICAgIG9wZW5Ub2RvKHRvZG9zLmxhc3RDaGlsZCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gICAgICAgIHRvZG9zLmFwcGVuZENoaWxkKGFkZFRvZG8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQoY3JlYXRlVG9kb0NvbnRhaW5lcik7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9TdWJtaXQpO1xuICAgICAgICB0b2Rvcy5hcHBlbmRDaGlsZChhZGRUb2RvKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNyZWF0ZVRvZG9Db250YWluZXIuYXBwZW5kKHRvZG9UaXRsZUxhYmVsLCB0b2RvSW5wdXRUaXRsZSwgdG9kb0Rlc2NyaXB0aW9uTGFiZWwsIHRvZG9JbnB1dERlc2NyaXB0aW9uLCB0b2RvSW5wdXREYXRlKTtcbiAgICB0b2Rvcy5hcHBlbmQoY3JlYXRlVG9kb0NvbnRhaW5lcik7XG4gICAgdG9kb3MuYXBwZW5kKHRvZG9TdWJtaXQpO1xuXG4gICAgdG9kb0lucHV0VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PSAnRW50ZXInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKS5jbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRvZG9JbnB1dERlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JykuY2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhZGRUb2RvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRvZG8oZWxlbWVudCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCkge1xuICB2YXIgbm9kZXMgPSBBcnJheS5mcm9tKHRvZG9zLmNoaWxkcmVuKTtcbiAgLy8gQ2xpY2sgb24gdG9kb3MgdG8gXCJvcGVuXCIgdGhlbVxuXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnRElWJykge1xuICAgICAgdGFyZ2V0ID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgLy8gQ2hpbGRyZW4gYXJlIG5vdCBhZmZlY3RlZCBieSBldmVudC5cbiAgICBpZiAodGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBsZXQgaW5kZXggPSBub2Rlcy5pbmRleE9mKHRhcmdldCk7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBsZXQgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxldCBkb25lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbGV0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGxldCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnV0dG9uc0NvbnRhaW5lci5pZCA9ICd0b2RvLWJ1dHRvbnMnO1xuICAgIGRvbmVCdXR0b24uaWQgPSAnZG9uZS10YXNrLWJ1dHRvbic7XG4gICAgcmVtb3ZlQnV0dG9uLmlkID0gJ3JlbW92ZS10YXNrLWJ1dHRvbic7XG4gICAgZHVlRGF0ZS5pZCA9ICdkdWUtZGF0ZSc7XG4gICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb2x1bW4nLCA4MCk7XG4gICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdyb3cnLCA1KTtcbiAgICBkZXNjcmlwdGlvbi5pZCA9ICd0b2RvLWRlc2NyaXB0aW9uJztcbiAgICBkdWVEYXRlLnNldEF0dHJpYnV0ZSgndHlwZScsICdkYXRlJyk7XG4gICAgZHVlRGF0ZS52YWx1ZSA9IGN1cnJlbnRQcm9qZWN0LnRvZG9zW2luZGV4XS5kdWVEYXRlO1xuICAgIHRvZG9Db250YWluZXIuY2xhc3NOYW1lID0gJ3RvZG8tc2VjdGlvbic7XG4gICAgdGl0bGUuaWQgPSAndG9kby10aXRsZSc7XG4gICAgdGl0bGUuc2V0QXR0cmlidXRlKCdjb2x1bW4nLCA4MCk7XG4gICAgdGl0bGUuc2V0QXR0cmlidXRlKCdyb3cnLCAxKTtcbiAgICB0aXRsZS52YWx1ZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JykuaW5uZXJUZXh0O1xuICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLmRlc2NyaXB0aW9uO1xuXG4gICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvbmVCdXR0b24uY2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKHJlbW92ZUJ1dHRvbiwgZG9uZUJ1dHRvbik7XG4gICAgdG9kb0NvbnRhaW5lci5hcHBlbmQodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBidXR0b25zQ29udGFpbmVyKTtcbiAgICByZW1vdmVCdXR0b24uaW5uZXJUZXh0ID0gJ0RlbGV0ZSB0YXNrJztcblxuICAgIC8vIFJlbW92ZSBhIHRhc2tcbiAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50UHJvamVjdC50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb0NvbnRhaW5lcik7XG4gICAgICB0b2Rvcy5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgIGxldCBpID0gMDtcblxuICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb3MubGFzdENoaWxkKTtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0b2Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICBkaXNwbGF5VG9kbyhjdXJyZW50UHJvamVjdC50b2Rvc1tpXSwgdG9kb3MsIGN1cnJlbnRBY2NvdW50KTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRvZG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgICAgb3BlblRvZG8oZWxlbWVudCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gICAgICB9XG4gICAgICB0b2Rvcy5hcHBlbmRDaGlsZChhZGROZXdUb2RvKGN1cnJlbnRQcm9qZWN0LCB0b2RvcywgY3VycmVudEFjY291bnQpKTtcbiAgICB9KTtcblxuICAgIGRvbmVCdXR0b24uaW5uZXJUZXh0ID0gJ0RvbmUnO1xuICAgIGRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aXRsZSBpcyBlbXB0eSwgc2F2ZSB0aGUgbmV3IGRlc2NyaXB0aW9uIGJ1dCBsZWF2ZSB0aGUgcHJldmlvdXMgdGl0bGUuXG4gICAgICBpZiAodGl0bGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb0NvbnRhaW5lcik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLnRpdGxlID0gdGl0bGUudmFsdWU7XG4gICAgICBjdXJyZW50UHJvamVjdC50b2Rvc1tpbmRleF0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zW2luZGV4XS5kdWVEYXRlID0gZHVlRGF0ZS52YWx1ZTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9Db250YWluZXIpO1xuICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKVswXS5pbm5lclRleHQgPSB0aXRsZS52YWx1ZTtcbiAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2JylbMV0uaW5uZXJUZXh0ID0gZHVlRGF0ZS52YWx1ZTtcblxuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIH0pO1xuICAgIHRvZG9zLmluc2VydEJlZm9yZSh0b2RvQ29udGFpbmVyLCB0b2Rvcy5jaGlsZHJlbltpbmRleF0pO1xuICB9KTtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tdG9kb3MtYmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWZnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogI2M0YzRjNDtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxNDYsIDE0NiwgMTQ2KTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjYWFhYWFhO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46IGdyZWVuO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxufVxcblxcbjpyb290LmxpZ2h0IHtcXG4gIC0tdG9kb3MtYmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWZnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogI2M0YzRjNDtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxNDYsIDE0NiwgMTQ2KTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjYWFhYWFhO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46IGdyZWVuO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxufVxcblxcbjpyb290LmRhcmsge1xcbiAgLS10b2Rvcy1iZzogIzI0MjkyRTtcXG4gIC0tdG9kb3MtZmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWRpdmlkZXI6IGdyZXk7XFxuICAtLXByb2plY3RzLWJnOiAjMUYyNDI4O1xcbiAgLS1wcm9qZWN0cy1zZWxlY3RlZC1iZzogcmdiKDExMiwgMTEyLCAxMTIpO1xcbiAgLS1kYXNoYm9hcmQtZGl2aWRlcjogYmxhY2s7XFxuICAtLWJ1dHRvbnMtaG92ZXItYmc6ICM0MTQ5NTA7XFxuICAtLXRvZG8tYm9yZGVyOiByZ2IoMTMzLCAxMzMsIDEzMyk7XFxuICAtLXRvZG8tZGF0ZS1ncmVlbjogIzcyZmY3MjtcXG4gIC0tdG9kby10aXRsZS1iZzogdHJhbnNwYXJlbnQ7XFxuICBjb2xvci1zY2hlbWU6IGRhcms7XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIgYnV0dG9uLCAjYWRkLXByb2plY3QtYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jdG9kb3MtY29udGFpbmVyIGJ1dHRvbjpob3ZlciwgI2FkZC1wcm9qZWN0LWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1idXR0b25zLWhvdmVyLWJnKTtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuXFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5cXG4uZGFzaGJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgzMDBweCwgNDAwcHgpO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG59XFxuXFxubGkge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxudWwge1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLnByb2plY3RzLWNvbnRhaW5lciB7XFxuICAvKiBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1kYXNoYm9hcmQtZGl2aWRlcik7ICovXFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb2plY3RzLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG5cXG4ucHJvamVjdHMtY29udGFpbmVyIGxpIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIG1hcmdpbjogMC41cmVtIDAgMC41cmVtIDA7XFxufVxcblxcbi5wcm9qZWN0cyAucHJvamVjdCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wcm9qZWN0LnNlbGVjdGVkLXByb2plY3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJvamVjdHMtc2VsZWN0ZWQtYmcpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG5cXG4ucHJvamVjdC1tZW51IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ucHJvamVjdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnByb2plY3QtYnV0dG9ucyBidXR0b24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuXFxufVxcblxcbiNkZWxldGUtcHJvamVjdDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk3LCA3NywgNzcpO1xcbn1cXG5cXG4uZGVsZXRlLXByb2plY3Qge1xcbiAgd2lkdGg6IDJyZW07XFxuICBoZWlnaHQ6IDJyZW07XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIge1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10b2Rvcy1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBwYWRkaW5nLXRvcDogMTB2aDtcXG59XFxuXFxuI2lubmVyLXByb2plY3QtdGl0bGUge1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICBmb250LXdlaWdodDogODAwO1xcbn1cXG5cXG4jdG9kb3Mge1xcbiAgd2lkdGg6IDgwJTtcXG4gIG1heC13aWR0aDogODAwcHg7XFxufVxcblxcbmxpIC5jaGVja2JveCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm9qZWN0cy1iZyk7XFxufVxcblxcbi50b2RvLXNlY3Rpb24ge1xcbiAgcGFkZGluZzogMS4xcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMS4xcmVtO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0b2RvLXRpdGxlLCAjdG9kby1kZXNjcmlwdGlvbiB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10b2RvLWJvcmRlcik7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgcmVzaXplOiBub25lO1xcbn1cXG5cXG4jdG9kby1idXR0b25zIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbiN0b2RvLWJ1dHRvbnMgYnV0dG9uIHtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuI3RvZG8tdGl0bGUge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG9kby10aXRsZS1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuI3RvZG8tYnV0dG9ucyAjcmVtb3ZlLXRhc2stYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTcsIDc3LCA3Nyk7XFxufVxcblxcbiN0b2RvLWRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRvZG8tdGl0bGUtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGhlaWdodDogNXJlbTtcXG59XFxuXFxuI3RvZG8tdGl0bGU6Zm9jdXMsICN0b2RvLWRlc2NyaXB0aW9uOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbiN0b2RvcyBsaSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIHBhZGRpbmc6IDEuMXJlbSAwIDEuMXJlbSAxLjFyZW07XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxufVxcblxcbiN0b2RvcyBsaTpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNoZWNrYm94IHtcXG4gIHdpZHRoOiAxLjVyZW07XFxuICBoZWlnaHQ6IDEuNXJlbTtcXG59XFxuXFxuLmFkZC10b2RvIHtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG59XFxuXFxuLmNyZWF0ZS10b2RvLWZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0b2RvLXRpdGxlLWlucHV0IHtcXG4gIHdpZHRoOiAzMHJlbTtcXG59XFxuXFxuI3RvZG8tZGVzY3JpcHRpb24taW5wdXQge1xcbiAgaGVpZ2h0OiA1cmVtO1xcbiAgd2lkdGg6IDMwcmVtO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUdBO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLDBDQUEwQztFQUMxQywwQkFBMEI7RUFDMUIsMkJBQTJCO0VBQzNCLGlDQUFp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QUFZO0FBQ2RcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCcpO1xcblxcblxcbjpyb290IHtcXG4gIC0tdG9kb3MtYmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWZnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogI2M0YzRjNDtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxNDYsIDE0NiwgMTQ2KTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjYWFhYWFhO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46IGdyZWVuO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxufVxcblxcbjpyb290LmxpZ2h0IHtcXG4gIC0tdG9kb3MtYmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWZnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogI2M0YzRjNDtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxNDYsIDE0NiwgMTQ2KTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjYWFhYWFhO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46IGdyZWVuO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxufVxcblxcbjpyb290LmRhcmsge1xcbiAgLS10b2Rvcy1iZzogIzI0MjkyRTtcXG4gIC0tdG9kb3MtZmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWRpdmlkZXI6IGdyZXk7XFxuICAtLXByb2plY3RzLWJnOiAjMUYyNDI4O1xcbiAgLS1wcm9qZWN0cy1zZWxlY3RlZC1iZzogcmdiKDExMiwgMTEyLCAxMTIpO1xcbiAgLS1kYXNoYm9hcmQtZGl2aWRlcjogYmxhY2s7XFxuICAtLWJ1dHRvbnMtaG92ZXItYmc6ICM0MTQ5NTA7XFxuICAtLXRvZG8tYm9yZGVyOiByZ2IoMTMzLCAxMzMsIDEzMyk7XFxuICAtLXRvZG8tZGF0ZS1ncmVlbjogIzcyZmY3MjtcXG4gIC0tdG9kby10aXRsZS1iZzogdHJhbnNwYXJlbnQ7XFxuICBjb2xvci1zY2hlbWU6IGRhcms7XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIgYnV0dG9uLCAjYWRkLXByb2plY3QtYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jdG9kb3MtY29udGFpbmVyIGJ1dHRvbjpob3ZlciwgI2FkZC1wcm9qZWN0LWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1idXR0b25zLWhvdmVyLWJnKTtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuXFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5cXG4uZGFzaGJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgzMDBweCwgNDAwcHgpO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG59XFxuXFxubGkge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxudWwge1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLnByb2plY3RzLWNvbnRhaW5lciB7XFxuICAvKiBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1kYXNoYm9hcmQtZGl2aWRlcik7ICovXFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb2plY3RzLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG5cXG4ucHJvamVjdHMtY29udGFpbmVyIGxpIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIG1hcmdpbjogMC41cmVtIDAgMC41cmVtIDA7XFxufVxcblxcbi5wcm9qZWN0cyAucHJvamVjdCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wcm9qZWN0LnNlbGVjdGVkLXByb2plY3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJvamVjdHMtc2VsZWN0ZWQtYmcpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG5cXG4ucHJvamVjdC1tZW51IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ucHJvamVjdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnByb2plY3QtYnV0dG9ucyBidXR0b24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuXFxufVxcblxcbiNkZWxldGUtcHJvamVjdDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk3LCA3NywgNzcpO1xcbn1cXG5cXG4uZGVsZXRlLXByb2plY3Qge1xcbiAgd2lkdGg6IDJyZW07XFxuICBoZWlnaHQ6IDJyZW07XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIge1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10b2Rvcy1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBwYWRkaW5nLXRvcDogMTB2aDtcXG59XFxuXFxuI2lubmVyLXByb2plY3QtdGl0bGUge1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICBmb250LXdlaWdodDogODAwO1xcbn1cXG5cXG4jdG9kb3Mge1xcbiAgd2lkdGg6IDgwJTtcXG4gIG1heC13aWR0aDogODAwcHg7XFxufVxcblxcbmxpIC5jaGVja2JveCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm9qZWN0cy1iZyk7XFxufVxcblxcbi50b2RvLXNlY3Rpb24ge1xcbiAgcGFkZGluZzogMS4xcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMS4xcmVtO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0b2RvLXRpdGxlLCAjdG9kby1kZXNjcmlwdGlvbiB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10b2RvLWJvcmRlcik7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgcmVzaXplOiBub25lO1xcbn1cXG5cXG4jdG9kby1idXR0b25zIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbiN0b2RvLWJ1dHRvbnMgYnV0dG9uIHtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuI3RvZG8tdGl0bGUge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG9kby10aXRsZS1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuI3RvZG8tYnV0dG9ucyAjcmVtb3ZlLXRhc2stYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTcsIDc3LCA3Nyk7XFxufVxcblxcbiN0b2RvLWRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRvZG8tdGl0bGUtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGhlaWdodDogNXJlbTtcXG59XFxuXFxuI3RvZG8tdGl0bGU6Zm9jdXMsICN0b2RvLWRlc2NyaXB0aW9uOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbiN0b2RvcyBsaSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIHBhZGRpbmc6IDEuMXJlbSAwIDEuMXJlbSAxLjFyZW07XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxufVxcblxcbiN0b2RvcyBsaTpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNoZWNrYm94IHtcXG4gIHdpZHRoOiAxLjVyZW07XFxuICBoZWlnaHQ6IDEuNXJlbTtcXG59XFxuXFxuLmFkZC10b2RvIHtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG59XFxuXFxuLmNyZWF0ZS10b2RvLWZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0b2RvLXRpdGxlLWlucHV0IHtcXG4gIHdpZHRoOiAzMHJlbTtcXG59XFxuXFxuI3RvZG8tZGVzY3JpcHRpb24taW5wdXQge1xcbiAgaGVpZ2h0OiA1cmVtO1xcbiAgd2lkdGg6IDMwcmVtO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJjcmVhdGVEZW1vIiwiYWRkTmV3UHJvamVjdCIsImRpc3BsYXlQcm9qZWN0Iiwic3dpdGNoUHJvamVjdCIsImFkZE5ld1RvZG8iLCJvcGVuVG9kbyIsImRpc3BsYXlUb2RvIiwiZGFzaGJvYXJkIiwiY29udGVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInByb2plY3RzQ29udGFpbmVyIiwic2lkZWJhciIsInRvZG9zQ29udGFpbmVyIiwidG9kb3MiLCJ0aGVtZVRvZ2dsZSIsImlubmVySFRNTCIsImRlbW9BY2NvdW50IiwiaW5ib3giLCJjdXJyZW50UHJvamVjdCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwcm9qZWN0cyIsImFkZFByb2plY3QiLCJjbGFzc05hbWUiLCJpZCIsInRvZG8iLCJhcHBlbmQiLCJhZGRFdmVudExpc3RlbmVyIiwicm9vdCIsImRvY3VtZW50RWxlbWVudCIsIm5ld1RoZW1lIiwiY29uc29sZSIsImxvZyIsInF1ZXJ5U2VsZWN0b3IiLCJwcm9qZWN0IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJvamVjdFRpdGxlIiwiZmlyc3RDaGlsZCIsImJlZm9yZSIsImJvZHkiLCJhY2NvdW50IiwibmFtZSIsInB1c2giLCJ0aXRsZSIsImFkZFRvZG8iLCJkZXNjcmlwdGlvbiIsImR1ZURhdGUiLCJEYXRlIiwiY29tcGxldGVkIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJnZXREYXRlIiwiam9pbiIsIndlYnNpdGUiLCJteVRvZG8iLCJjb21wbGV0ZWRUb2RvIiwiaGFsZkZpbGxlZFRvZG8iLCJteVRvZG8xIiwid2Vic2l0ZVRvZG8iLCJ3ZWJzaXRlVG9kbzEiLCJjdXJyZW50QWNjb3VudCIsInByb2plY3REaXNwbGF5IiwibWVudSIsImUiLCJwcm9qZWN0TWVudSIsImNvbnRhaW5zIiwicmVtb3ZlQ2hpbGQiLCJwcm9qZWN0SW5wdXQiLCJwcm9qZWN0U3VibWl0IiwidmFsdWUiLCJuZXdQcm9qZWN0IiwiYXBwZW5kQ2hpbGQiLCJldmVudCIsImtleSIsInByZXZlbnREZWZhdWx0IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGljayIsInByb2plY3RFbGVtZW50IiwicHJvamVjdE5vZGVzIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGRyZW4iLCJ0YXJnZXQiLCJ0YWdOYW1lIiwicmVtb3ZlIiwiaW5kZXgiLCJpbmRleE9mIiwibm9kZXMiLCJwcm9qZWN0VGl0bGVJbnB1dCIsImJ1dHRvbnNDb250YWluZXIiLCJkb25lQnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwicGFyZW50RWxlbWVudCIsInNwbGljZSIsImkiLCJsYXN0Q2hpbGQiLCJyZXN1bHRQcm9qZWN0RGlzcGxheSIsInRvZG9EaXNwbGF5IiwidG9kb1RpdGxlIiwiY2hlY2tib3giLCJ0b2RvRGF0ZSIsInNldEF0dHJpYnV0ZSIsImN1cnJlbnREYXRlIiwic3R5bGUiLCJjb2xvciIsImNoZWNrZWQiLCJ0ZXh0RGVjb3JhdGlvbiIsImNyZWF0ZVRvZG9Db250YWluZXIiLCJ0b2RvVGl0bGVMYWJlbCIsInRvZG9JbnB1dFRpdGxlIiwidG9kb0Rlc2NyaXB0aW9uTGFiZWwiLCJ0b2RvSW5wdXREZXNjcmlwdGlvbiIsInRvZG9JbnB1dERhdGUiLCJ0b2RvU3VibWl0IiwiZm9yIiwibmV3VG9kb1RpdGxlIiwibmV3VG9kb0Rlc2NyaXB0aW9uIiwibmV3VG9kb0RhdGUiLCJuZXdUb2RvIiwiZGlzcGxheSIsInRvZG9Db250YWluZXIiLCJyZW1vdmVCdXR0b24iLCJpbm5lclRleHQiLCJpbnNlcnRCZWZvcmUiXSwic291cmNlUm9vdCI6IiJ9