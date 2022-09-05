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
  localStorage.clear(); // let demoAccount = JSON.parse(localStorage.getItem('user'));
  // console.log(demoAccount);
  // let currentProject = demoAccount.projects[0];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2Rhc2hib2FyZC5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy90b2Rvcy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVEZW1vIH0gZnJvbSAnLi9sb2dpYy5qcyc7XG5pbXBvcnQgeyBhZGROZXdQcm9qZWN0LCBkaXNwbGF5UHJvamVjdCwgc3dpdGNoUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgYWRkTmV3VG9kbywgb3BlblRvZG8sIGRpc3BsYXlUb2RvIH0gZnJvbSAnLi90b2Rvcy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXNoYm9hcmQoKSB7XG4gIGxldCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgc2lkZWJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGxldCB0b2Rvc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgdG9kb3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBsZXQgdGhlbWVUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgdGhlbWVUb2dnbGUuaW5uZXJIVE1MID0gJ1RvZ2dsZSBUaGVtZSc7XG5cbiAgbGV0IHsgZGVtb0FjY291bnQsIGluYm94IH0gPSBjcmVhdGVEZW1vKCk7XG4gIGxldCBjdXJyZW50UHJvamVjdCA9IGluYm94O1xuICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuICAvLyBsZXQgZGVtb0FjY291bnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAvLyBjb25zb2xlLmxvZyhkZW1vQWNjb3VudCk7XG4gIC8vIGxldCBjdXJyZW50UHJvamVjdCA9IGRlbW9BY2NvdW50LnByb2plY3RzWzBdO1xuXG4gIGxldCBhZGRQcm9qZWN0ID0gYWRkTmV3UHJvamVjdChzaWRlYmFyLCBkZW1vQWNjb3VudCwgdG9kb3MpO1xuICBwcm9qZWN0c0NvbnRhaW5lci5jbGFzc05hbWUgPSAncHJvamVjdHMtY29udGFpbmVyJztcbiAgc2lkZWJhci5jbGFzc05hbWUgPSAncHJvamVjdHMnO1xuICB0b2Rvc0NvbnRhaW5lci5pZCA9ICd0b2Rvcy1jb250YWluZXInO1xuICB0b2Rvcy5pZCA9ICd0b2Rvcyc7XG5cbiAgZm9yIChjb25zdCB0b2RvIG9mIGN1cnJlbnRQcm9qZWN0LnRvZG9zKSB7XG4gICAgZGlzcGxheVRvZG8odG9kbywgdG9kb3MsIGRlbW9BY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gIH1cbiAgdG9kb3MuYXBwZW5kKGFkZE5ld1RvZG8oY3VycmVudFByb2plY3QsIHRvZG9zLCBkZW1vQWNjb3VudCkpO1xuXG4gIHRoZW1lVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3QgbmV3VGhlbWUgPSByb290LmNsYXNzTmFtZSA9PT0gJ2RhcmsnID8gJ2xpZ2h0JyA6ICdkYXJrJztcbiAgICByb290LmNsYXNzTmFtZSA9IG5ld1RoZW1lO1xuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5zZXRBdHRyaWJ1dGUoJ2NvbG9yLXNjaGVtZScsICdsaWdodCcpO1xuICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSk7XG4gIH0pXG5cbiAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kKHRoZW1lVG9nZ2xlKTtcbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIGRlbW9BY2NvdW50LnByb2plY3RzKSB7XG4gICAgc2lkZWJhci5hcHBlbmQoZGlzcGxheVByb2plY3QocHJvamVjdCwgc2lkZWJhciwgZGVtb0FjY291bnQsIHRvZG9zKSk7XG4gIH1cbiAgc2lkZWJhci5xdWVyeVNlbGVjdG9yKCdsaScpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLXByb2plY3QnKTtcblxuICBzaWRlYmFyLmFwcGVuZChhZGRQcm9qZWN0KTtcbiAgdG9kb3NDb250YWluZXIuYXBwZW5kKHRvZG9zKTtcbiAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kKHNpZGViYXIpO1xuICBjb250ZW50LmNsYXNzTmFtZSA9ICdkYXNoYm9hcmQnO1xuICBjb250ZW50LmFwcGVuZChwcm9qZWN0c0NvbnRhaW5lcik7XG4gIGNvbnRlbnQuYXBwZW5kKHRvZG9zQ29udGFpbmVyKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShkZW1vQWNjb3VudCkpO1xuXG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiB0b2Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgb3BlblRvZG8oZWxlbWVudCwgdG9kb3MsIGRlbW9BY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2Ygc2lkZWJhci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgc3dpdGNoUHJvamVjdChlbGVtZW50LCBzaWRlYmFyLCB0b2RvcywgZGVtb0FjY291bnQpO1xuICB9XG5cbiAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcm9qZWN0VGl0bGUuaWQgPSAnaW5uZXItcHJvamVjdC10aXRsZSc7XG4gIHByb2plY3RUaXRsZS5pbm5lckhUTUwgPSBzaWRlYmFyLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5pbm5lckhUTUw7XG4gIHRvZG9zLmJlZm9yZShwcm9qZWN0VGl0bGUpO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBkYXNoYm9hcmQgfSBmcm9tICcuL2Rhc2hib2FyZC5qcyc7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kKGRhc2hib2FyZCgpKTtcblxuIiwiZXhwb3J0IGZ1bmN0aW9uIGFjY291bnQobmFtZSkge1xuICBsZXQgcHJvamVjdHMgPSBbXTtcbiAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgfVxuICByZXR1cm4geyBhZGRQcm9qZWN0LCBwcm9qZWN0cywgbmFtZSB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0KHRpdGxlKSB7XG4gIGxldCB0b2RvcyA9IFtdO1xuICBmdW5jdGlvbiBhZGRUb2RvKHRvZG8pIHtcbiAgICB0b2Rvcy5wdXNoKHRvZG8pO1xuICB9XG4gIHJldHVybiB7IGFjY291bnQsIGFkZFRvZG8sIHRvZG9zLCB0aXRsZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9kbyh0aXRsZSA9ICdUb2RvIFRpdGxlJywgZGVzY3JpcHRpb24gPSAnVG9kbyBEZXNjcmlwdGlvbicsIGR1ZURhdGUgPSBuZXcgRGF0ZSgpLCBjb21wbGV0ZWQgPSBmYWxzZSkge1xuICBpZiAodHlwZW9mIGR1ZURhdGUgPT0gJ29iamVjdCcpIHtcbiAgICBkdWVEYXRlID0gW1xuICAgICAgZHVlRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgKGR1ZURhdGUuZ2V0TW9udGgoKSsxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyksXG4gICAgICAoZHVlRGF0ZS5nZXREYXRlKCkpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSxcbiAgICBdLmpvaW4oJy0nKTtcbiAgfVxuICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGNvbXBsZXRlZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVtbygpIHtcbiAgY29uc3QgZGVtb0FjY291bnQgPSBhY2NvdW50KCdEZW1vbWFuJyk7XG4gIGNvbnN0IGluYm94ID0gcHJvamVjdCgnSW5ib3gnKTtcbiAgY29uc3Qgd2Vic2l0ZSA9IHByb2plY3QoJ015IHdlYnNpdGUgcHJvamVjdCcpO1xuICBjb25zdCBteVRvZG8gPSB0b2RvKCdFeGFtcGxlIFRvZG8nLCAnSGVyZSBpcyBhbiBleGFtcGxlIGRlc2NyaXB0aW9uJywgbmV3IERhdGUoKSwgZmFsc2UpO1xuICBjb25zdCBjb21wbGV0ZWRUb2RvID0gdG9kbygnQ29tcGxldGVkIFRvZG8nLCAnSGVyZSBpcyBhbiBleGFtcGxlIG9mIGEgY29tcGxldGVkIHRvZG8nLCBuZXcgRGF0ZSgpLCB0cnVlKTtcbiAgY29uc3QgaGFsZkZpbGxlZFRvZG8gPSB0b2RvKCdIYWxmIFRvZG8nLCAnRGVzY3JpcHRpb24gYW5kIG5vIGRhdGUgb3IgY29tcGxldGVkIHZhbHVlJywgbmV3IERhdGUoKSwgZmFsc2UpO1xuICBjb25zdCBteVRvZG8xID0gdG9kbygpO1xuICBjb25zdCB3ZWJzaXRlVG9kbyA9IHRvZG8oJ0FkZCBkaXZzJywgJ0FkZCBzdGFydGluZyBkaXZzIHRvIG15IHdlYnNpdGUnLCBuZXcgRGF0ZSgpLCBmYWxzZSk7XG4gIGNvbnN0IHdlYnNpdGVUb2RvMSA9IHRvZG8oJ1N0eWxlIGRpdnMnLCAnU3R5bGUgbXkgZGl2cyB0byBtYWtlIHRoZW0gbG9vayBuaWNlLicsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgXG4gIGRlbW9BY2NvdW50LmFkZFByb2plY3QoaW5ib3gpO1xuICBkZW1vQWNjb3VudC5hZGRQcm9qZWN0KHdlYnNpdGUpO1xuICBpbmJveC5hZGRUb2RvKGNvbXBsZXRlZFRvZG8pO1xuICBpbmJveC5hZGRUb2RvKG15VG9kbyk7XG4gIGluYm94LmFkZFRvZG8obXlUb2RvMSk7XG4gIGluYm94LmFkZFRvZG8oaGFsZkZpbGxlZFRvZG8pO1xuICB3ZWJzaXRlLmFkZFRvZG8od2Vic2l0ZVRvZG8pO1xuICB3ZWJzaXRlLmFkZFRvZG8od2Vic2l0ZVRvZG8xKTtcbiAgcmV0dXJuIHsgZGVtb0FjY291bnQsIGluYm94IH1cbn1cbiIsImltcG9ydCB7ZGlzcGxheVRvZG8sIGFkZE5ld1RvZG8sIG9wZW5Ub2RvfSBmcm9tICcuL3RvZG9zLmpzJztcbmltcG9ydCB7cHJvamVjdH0gZnJvbSAnLi9sb2dpYy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UHJvamVjdChwcm9qZWN0LCBzaWRlYmFyLCBjdXJyZW50QWNjb3VudCwgdG9kb3MpIHtcbiAgbGV0IHByb2plY3REaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgbGV0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIHByb2plY3RUaXRsZS5pZCA9ICdwcm9qZWN0LW5hbWUnO1xuICBwcm9qZWN0RGlzcGxheS5jbGFzc05hbWUgPSAncHJvamVjdCc7XG4gIHByb2plY3RUaXRsZS5pbm5lckhUTUwgPSBwcm9qZWN0LnRpdGxlO1xuXG4gIGxldCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICBtZW51LmNsYXNzTGlzdC5hZGQoJ2ZhLXNvbGlkJyk7XG4gIG1lbnUuY2xhc3NMaXN0LmFkZCgnZmEtZWxsaXBzaXMnKTtcbiAgbWVudS5jbGFzc0xpc3QuYWRkKCdmYS14bCcpO1xuICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBwcm9qZWN0TWVudShlLCBwcm9qZWN0RGlzcGxheSwgcHJvamVjdFRpdGxlLCBtZW51LCBcbiAgICAgICAgICAgICAgICBzaWRlYmFyLCBwcm9qZWN0LCBjdXJyZW50QWNjb3VudCwgdG9kb3MpO1xuICB9KTtcbiAgcHJvamVjdERpc3BsYXkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgIGlmICghcHJvamVjdERpc3BsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LW1lbnUnKSlcbiAgICAgIHByb2plY3REaXNwbGF5LmFwcGVuZChtZW51KTtcbiAgfSk7XG4gIHByb2plY3REaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgIGlmICghcHJvamVjdERpc3BsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0LW1lbnUnKSlcbiAgICBwcm9qZWN0RGlzcGxheS5yZW1vdmVDaGlsZChtZW51KVxuICB9KTtcbiAgcHJvamVjdERpc3BsYXkuYXBwZW5kKHByb2plY3RUaXRsZSk7XG4gIHJldHVybiBwcm9qZWN0RGlzcGxheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ld1Byb2plY3QocHJvamVjdHMsIGN1cnJlbnRBY2NvdW50LCB0b2Rvcykge1xuICBsZXQgYWRkUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBhZGRQcm9qZWN0LmlubmVySFRNTCA9ICdBZGQgbmV3IHByb2plY3QnO1xuICBhZGRQcm9qZWN0LmlkID0gJ2FkZC1wcm9qZWN0LWJ1dHRvbic7XG4gIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQoYWRkUHJvamVjdCk7XG4gICAgbGV0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGV0IHByb2plY3RTdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwcm9qZWN0U3VibWl0LmlubmVySFRNTCA9ICdTdWJtaXQnO1xuICAgIHByb2plY3RTdWJtaXQuaWQgPSAnc3VibWl0JztcbiAgICBwcm9qZWN0U3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHByb2plY3RJbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3QocHJvamVjdElucHV0LnZhbHVlKTtcbiAgICAgICAgY3VycmVudEFjY291bnQucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgICAgICBsZXQgcHJvamVjdERpc3BsYXkgPSBkaXNwbGF5UHJvamVjdChuZXdQcm9qZWN0LCBwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKTtcbiAgICAgICAgcHJvamVjdHMuYXBwZW5kKHByb2plY3REaXNwbGF5LCBhZGRQcm9qZWN0KTtcbiAgICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdElucHV0KTtcbiAgICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdFN1Ym1pdCk7XG5cbiAgICAgICAgc3dpdGNoUHJvamVjdChwcm9qZWN0RGlzcGxheSwgcHJvamVjdHMsIHRvZG9zLCBjdXJyZW50QWNjb3VudCk7XG4gICAgICB9XG4gICAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChwcm9qZWN0SW5wdXQpO1xuICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdFN1Ym1pdCk7XG4gICAgICBwcm9qZWN0cy5hcHBlbmRDaGlsZChhZGRQcm9qZWN0KTtcbiAgICB9KTtcbiAgICBwcm9qZWN0cy5hcHBlbmQocHJvamVjdElucHV0KTtcbiAgICBwcm9qZWN0cy5hcHBlbmQocHJvamVjdFN1Ym1pdCk7XG4gICAgcHJvamVjdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JykuY2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhZGRQcm9qZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoUHJvamVjdChwcm9qZWN0RWxlbWVudCwgcHJvamVjdHMsIHRvZG9zLCBjdXJyZW50QWNjb3VudCkge1xuICAvLyBDbGljayBvbiBwcm9qZWN0cyB0byBzd2l0Y2ggY3VycmVudFByb2plY3RcbiAgdmFyIHByb2plY3ROb2RlcyA9IEFycmF5LmZyb20ocHJvamVjdHMuY2hpbGRyZW4pO1xuICBwcm9qZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7IFxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnRElWJykge1xuICAgICAgdGFyZ2V0ID0gcHJvamVjdEVsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnSScpIHtcbiAgICAgIHRhcmdldCA9IHByb2plY3RFbGVtZW50O1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgIHByb2plY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtcHJvamVjdCcpO1xuICAgIH1cbiAgICBwcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1wcm9qZWN0Jyk7XG5cbiAgICBsZXQgaW5kZXggPSBwcm9qZWN0Tm9kZXMuaW5kZXhPZih0YXJnZXQpO1xuICAgIHdoaWxlKHRvZG9zLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb3MuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGxldCBjdXJyZW50UHJvamVjdCA9IGN1cnJlbnRBY2NvdW50LnByb2plY3RzW2luZGV4XTtcblxuICAgIC8vIEFkZCBwcm9qZWN0IHRpdGxlIHRvIHRoZSB0b3Agb2YgdGhlIHRvZG8gbGlzdFxuICAgIGxldCB0b2Rvc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2Rvcy1jb250YWluZXInKTtcbiAgICBpZiAodG9kb3NDb250YWluZXIuY29udGFpbnMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lubmVyLXByb2plY3QtdGl0bGUnKSkpIHtcbiAgICAgIHRvZG9zQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRvZG9zQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBsZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdFRpdGxlLmlkID0gJ2lubmVyLXByb2plY3QtdGl0bGUnO1xuICAgIGlmIChwcm9qZWN0RWxlbWVudC5maXJzdENoaWxkLnRhZ05hbWUgPT0gJ0RJVicpXG4gICAgICBwcm9qZWN0VGl0bGUuaW5uZXJIVE1MID0gcHJvamVjdEVsZW1lbnQuZmlyc3RDaGlsZC5pbm5lckhUTUw7XG4gICAgaWYgKHByb2plY3RFbGVtZW50LmZpcnN0Q2hpbGQudGFnTmFtZSA9PSAnSU5QVVQnKVxuICAgICAgcHJvamVjdFRpdGxlLmlubmVySFRNTCA9IHByb2plY3RFbGVtZW50LmZpcnN0Q2hpbGQudmFsdWU7XG4gICAgdG9kb3MuYmVmb3JlKHByb2plY3RUaXRsZSlcblxuICAgIGZvciAoY29uc3QgdG9kbyBvZiBjdXJyZW50UHJvamVjdC50b2Rvcykge1xuICAgICAgZGlzcGxheVRvZG8odG9kbywgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0b2Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICBvcGVuVG9kbyhlbGVtZW50LCB0b2RvcywgY3VycmVudEFjY291bnQsIGN1cnJlbnRQcm9qZWN0KTtcbiAgICB9XG4gICAgdG9kb3MuYXBwZW5kKGFkZE5ld1RvZG8oY3VycmVudFByb2plY3QsIHRvZG9zLCBjdXJyZW50QWNjb3VudCkpO1xuICAgIHJldHVybiBpbmRleDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0TWVudShlLCBwcm9qZWN0RGlzcGxheSwgcHJvamVjdFRpdGxlLCBtZW51LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RzLCBwcm9qZWN0LCBjdXJyZW50QWNjb3VudCwgdG9kb3MpIHtcbiAgdmFyIG5vZGVzID0gQXJyYXkuZnJvbShwcm9qZWN0cy5jaGlsZHJlbik7XG4gIGxldCBwcm9qZWN0VGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGxldCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBkb25lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgbGV0IGluZGV4ID0gbm9kZXMuaW5kZXhPZihlLnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LW1lbnUnKTtcbiAgZGVsZXRlQnV0dG9uLmlkID0gJ2RlbGV0ZS1wcm9qZWN0JztcbiAgZG9uZUJ1dHRvbi5pZCA9ICdzdWJtaXQtcHJvamVjdCc7XG4gIGRvbmVCdXR0b24uaW5uZXJIVE1MID0gJ0RvbmUnO1xuICBkZWxldGVCdXR0b24uaW5uZXJIVE1MID0gJ0RlbGV0ZSc7XG4gIGJ1dHRvbnNDb250YWluZXIuY2xhc3NOYW1lID0gJ3Byb2plY3QtYnV0dG9ucyc7XG4gIHByb2plY3RUaXRsZUlucHV0LnZhbHVlID0gcHJvamVjdC50aXRsZTtcbiAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQoZGVsZXRlQnV0dG9uLCBkb25lQnV0dG9uKTtcbiAgcHJvamVjdERpc3BsYXkucmVtb3ZlQ2hpbGQocHJvamVjdFRpdGxlKTtcbiAgcHJvamVjdERpc3BsYXkucmVtb3ZlQ2hpbGQobWVudSk7XG4gIHByb2plY3REaXNwbGF5LmFwcGVuZChwcm9qZWN0VGl0bGVJbnB1dCwgYnV0dG9uc0NvbnRhaW5lcik7XG5cbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjdXJyZW50QWNjb3VudC5wcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3REaXNwbGF5KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgbGV0IGkgPSAwO1xuICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3RzLmxhc3RDaGlsZCk7XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgcHJvamVjdHMuYXBwZW5kKGRpc3BsYXlQcm9qZWN0KGN1cnJlbnRBY2NvdW50LnByb2plY3RzW2ldLCBwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKSk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwcm9qZWN0cy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICBjb25zb2xlLmxvZygnZnVjaycpO1xuICAgICAgc3dpdGNoUHJvamVjdChlbGVtZW50LCBwcm9qZWN0cywgdG9kb3MsIGN1cnJlbnRBY2NvdW50KTtcbiAgICB9XG4gICAgcHJvamVjdHMuYXBwZW5kQ2hpbGQoYWRkTmV3UHJvamVjdChwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKSk7XG4gIH0pO1xuXG4gIGRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKHByb2plY3RUaXRsZUlucHV0LnZhbHVlICE9ICcnKSB7XG4gICAgICBjdXJyZW50QWNjb3VudC5wcm9qZWN0c1tpbmRleF0udGl0bGUgPSBwcm9qZWN0VGl0bGVJbnB1dC52YWx1ZTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICB9XG4gICAgICBsZXQgcmVzdWx0UHJvamVjdERpc3BsYXkgPSBkaXNwbGF5UHJvamVjdChwcm9qZWN0LCBwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKTtcbiAgICAgIGlmIChwcm9qZWN0RGlzcGxheS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkLXByb2plY3QnKSlcbiAgICAgICAgcmVzdWx0UHJvamVjdERpc3BsYXkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtcHJvamVjdCcpO1xuICAgICAgcHJvamVjdERpc3BsYXkuYmVmb3JlKHJlc3VsdFByb2plY3REaXNwbGF5KTtcbiAgICAgIHN3aXRjaFByb2plY3QocmVzdWx0UHJvamVjdERpc3BsYXksIHByb2plY3RzLCB0b2RvcywgY3VycmVudEFjY291bnQpO1xuICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdERpc3BsYXkpO1xuICB9KTtcblxuICBwcm9qZWN0VGl0bGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PSAnRW50ZXInKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1wcm9qZWN0JykuY2xpY2soKTtcbiAgICB9XG4gIH0pOyBcblxufSIsImltcG9ydCB7IHRvZG8gfSBmcm9tICcuL2xvZ2ljLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlUb2RvKHRvZG8sIHRvZG9zLCBjdXJyZW50QWNjb3VudCkge1xuICBsZXQgdG9kb0Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBsZXQgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGxldCB0b2RvRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgY2hlY2tib3guY2xhc3NOYW1lID0gJ2NoZWNrYm94JztcbiAgdG9kb1RpdGxlLmlkID0gJ3RvZG9saXN0LXRvZG8tdGl0bGUnO1xuICB0b2RvRGF0ZS5pZCA9ICd0b2RvLWRhdGUnO1xuICB0b2RvVGl0bGUuaW5uZXJIVE1MID0gdG9kby50aXRsZTtcbiAgdG9kb0RhdGUuaW5uZXJIVE1MID0gdG9kby5kdWVEYXRlO1xuXG4gIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGN1cnJlbnREYXRlID0gW2N1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgIChjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpLFxuICAgICAgICAgICAgICAgICAoY3VycmVudERhdGUuZ2V0RGF0ZSgpKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyksXG4gICAgICAgICAgICAgICAgXS5qb2luKCctJyk7XG4gIGlmICh0b2RvLmR1ZURhdGUgPT0gY3VycmVudERhdGUpIHtcbiAgICB0b2RvRGF0ZS5zdHlsZS5jb2xvciA9ICd2YXIoLS10b2RvLWRhdGUtZ3JlZW4pJztcbiAgfVxuICB0b2RvRGlzcGxheS5hcHBlbmRDaGlsZChjaGVja2JveCk7XG4gIHRvZG9EaXNwbGF5LmFwcGVuZENoaWxkKHRvZG9UaXRsZSk7XG4gIHRvZG9EaXNwbGF5LmFwcGVuZENoaWxkKHRvZG9EYXRlKTtcbiAgaWYgKHRvZG8uY29tcGxldGVkKSB7XG4gICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgdG9kb0Rpc3BsYXkuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbGluZS10aHJvdWdoJztcbiAgfVxuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICB0b2RvLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICB0b2RvRGlzcGxheS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdsaW5lLXRocm91Z2gnO1xuICAgICAgY29uc29sZS5sb2coY3VycmVudEFjY291bnQpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2RvLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgdG9kb0Rpc3BsYXkuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbm9uZSc7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgfVxuICB9KTtcbiAgdG9kb3MuYXBwZW5kKHRvZG9EaXNwbGF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE5ld1RvZG8oY3VycmVudFByb2plY3QsIHRvZG9zLCBjdXJyZW50QWNjb3VudCkge1xuICBsZXQgYWRkVG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBhZGRUb2RvLmNsYXNzTmFtZSA9ICdhZGQtdG9kbyc7XG4gIGFkZFRvZG8uaW5uZXJIVE1MID0gJ0FkZCBuZXcgdGFzayc7XG4gIGFkZFRvZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgdG9kb3MucmVtb3ZlQ2hpbGQoYWRkVG9kbyk7XG4gICAgbGV0IGNyZWF0ZVRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgdG9kb1RpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxldCB0b2RvSW5wdXRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGV0IHRvZG9EZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsZXQgdG9kb0lucHV0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIGxldCB0b2RvSW5wdXREYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsZXQgdG9kb1N1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGxldCB0b2RvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbGV0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgdG9kb1RpdGxlTGFiZWwuaW5uZXJIVE1MID0gJ1RpdGxlJztcbiAgICB0b2RvVGl0bGVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICd0b2RvLXRpdGxlLWlucHV0Jyk7XG4gICAgdG9kb0Rlc2NyaXB0aW9uTGFiZWwuaW5uZXJIVE1MID0gJ0Rlc2NyaXB0aW9uJztcbiAgICB0b2RvRGVzY3JpcHRpb25MYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICd0b2RvLWRlc2NyaXB0aW9uLWlucHV0Jyk7XG4gICAgdG9kb0Rlc2NyaXB0aW9uTGFiZWwuZm9yID0gJ3RvZG8tZGVzY3JpcHRpb24taW5wdXQnO1xuICAgIGNyZWF0ZVRvZG9Db250YWluZXIuY2xhc3NOYW1lID0gJ2NyZWF0ZS10b2RvLWZvcm0nO1xuICAgIHRvZG9JbnB1dFRpdGxlLmlkID0gJ3RvZG8tdGl0bGUtaW5wdXQnO1xuICAgIHRvZG9JbnB1dERlc2NyaXB0aW9uLmlkID0gJ3RvZG8tZGVzY3JpcHRpb24taW5wdXQnO1xuICAgIHRvZG9JbnB1dERlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29sdW1uJywgODApO1xuICAgIHRvZG9JbnB1dERlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgncm93JywgMyk7XG4gICAgdG9kb1N1Ym1pdC5pbm5lckhUTUwgPSAnU3VibWl0JztcbiAgICB0b2RvU3VibWl0LmlkID0gJ3N1Ym1pdCc7XG4gICAgdG9kb0lucHV0RGF0ZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZGF0ZScpO1xuXG4gICAgdG9kb1N1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0b2RvSW5wdXRUaXRsZS52YWx1ZSAhPSAnJykge1xuICAgICAgICBsZXQgbmV3VG9kb1RpdGxlID0gdG9kb0lucHV0VGl0bGUudmFsdWU7XG4gICAgICAgIGxldCBuZXdUb2RvRGVzY3JpcHRpb24gPSB0b2RvSW5wdXREZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgbGV0IG5ld1RvZG9EYXRlID0gdG9kb0lucHV0RGF0ZS52YWx1ZTtcbiAgICAgICAgaWYgKHRvZG9JbnB1dERlc2NyaXB0aW9uLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgbmV3VG9kb0Rlc2NyaXB0aW9uID0gJ0VtcHR5JztcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3VG9kbyA9IHRvZG8obmV3VG9kb1RpdGxlLCBuZXdUb2RvRGVzY3JpcHRpb24sIG5ld1RvZG9EYXRlLCBmYWxzZSk7XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zLnB1c2gobmV3VG9kbyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgICAgdG9kb1RpdGxlLmlubmVySFRNTCA9IG5ld1RvZG8udGl0bGU7XG4gICAgICAgIHRvZG9EaXNwbGF5LmFwcGVuZChjaGVja2JveCwgdG9kb1RpdGxlKTtcbiAgICAgICAgLy8gdG9kb3MuYXBwZW5kKHRvZG9EaXNwbGF5KTtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQoY3JlYXRlVG9kb0NvbnRhaW5lcik7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9TdWJtaXQpO1xuICAgICAgICBkaXNwbGF5VG9kbyhuZXdUb2RvLCB0b2RvcywgY3VycmVudEFjY291bnQpO1xuXG4gICAgICAgIG9wZW5Ub2RvKHRvZG9zLmxhc3RDaGlsZCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gICAgICAgIHRvZG9zLmFwcGVuZENoaWxkKGFkZFRvZG8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQoY3JlYXRlVG9kb0NvbnRhaW5lcik7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9TdWJtaXQpO1xuICAgICAgICB0b2Rvcy5hcHBlbmRDaGlsZChhZGRUb2RvKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNyZWF0ZVRvZG9Db250YWluZXIuYXBwZW5kKHRvZG9UaXRsZUxhYmVsLCB0b2RvSW5wdXRUaXRsZSwgdG9kb0Rlc2NyaXB0aW9uTGFiZWwsIHRvZG9JbnB1dERlc2NyaXB0aW9uLCB0b2RvSW5wdXREYXRlKTtcbiAgICB0b2Rvcy5hcHBlbmQoY3JlYXRlVG9kb0NvbnRhaW5lcik7XG4gICAgdG9kb3MuYXBwZW5kKHRvZG9TdWJtaXQpO1xuXG4gICAgdG9kb0lucHV0VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PSAnRW50ZXInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKS5jbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRvZG9JbnB1dERlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JykuY2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBhZGRUb2RvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRvZG8oZWxlbWVudCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCkge1xuICB2YXIgbm9kZXMgPSBBcnJheS5mcm9tKHRvZG9zLmNoaWxkcmVuKTtcbiAgLy8gQ2xpY2sgb24gdG9kb3MgdG8gXCJvcGVuXCIgdGhlbVxuXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnRElWJykge1xuICAgICAgdGFyZ2V0ID0gZS50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgLy8gQ2hpbGRyZW4gYXJlIG5vdCBhZmZlY3RlZCBieSBldmVudC5cbiAgICBpZiAodGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBsZXQgaW5kZXggPSBub2Rlcy5pbmRleE9mKHRhcmdldCk7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBsZXQgdG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgbGV0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxldCBkb25lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbGV0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGxldCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnV0dG9uc0NvbnRhaW5lci5pZCA9ICd0b2RvLWJ1dHRvbnMnO1xuICAgIGRvbmVCdXR0b24uaWQgPSAnZG9uZS10YXNrLWJ1dHRvbic7XG4gICAgcmVtb3ZlQnV0dG9uLmlkID0gJ3JlbW92ZS10YXNrLWJ1dHRvbic7XG4gICAgZHVlRGF0ZS5pZCA9ICdkdWUtZGF0ZSc7XG4gICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb2x1bW4nLCA4MCk7XG4gICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdyb3cnLCA1KTtcbiAgICBkZXNjcmlwdGlvbi5pZCA9ICd0b2RvLWRlc2NyaXB0aW9uJztcbiAgICBkdWVEYXRlLnNldEF0dHJpYnV0ZSgndHlwZScsICdkYXRlJyk7XG4gICAgZHVlRGF0ZS52YWx1ZSA9IGN1cnJlbnRQcm9qZWN0LnRvZG9zW2luZGV4XS5kdWVEYXRlO1xuICAgIHRvZG9Db250YWluZXIuY2xhc3NOYW1lID0gJ3RvZG8tc2VjdGlvbic7XG4gICAgdGl0bGUuaWQgPSAndG9kby10aXRsZSc7XG4gICAgdGl0bGUuc2V0QXR0cmlidXRlKCdjb2x1bW4nLCA4MCk7XG4gICAgdGl0bGUuc2V0QXR0cmlidXRlKCdyb3cnLCAxKTtcbiAgICB0aXRsZS52YWx1ZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JykuaW5uZXJUZXh0O1xuICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLmRlc2NyaXB0aW9uO1xuXG4gICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvbmVCdXR0b24uY2xpY2soKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKHJlbW92ZUJ1dHRvbiwgZG9uZUJ1dHRvbik7XG4gICAgdG9kb0NvbnRhaW5lci5hcHBlbmQodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBidXR0b25zQ29udGFpbmVyKTtcbiAgICByZW1vdmVCdXR0b24uaW5uZXJUZXh0ID0gJ0RlbGV0ZSB0YXNrJztcblxuICAgIC8vIFJlbW92ZSBhIHRhc2tcbiAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50UHJvamVjdC50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb0NvbnRhaW5lcik7XG4gICAgICB0b2Rvcy5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgIGxldCBpID0gMDtcblxuICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb3MubGFzdENoaWxkKTtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0b2Rvcy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSB7XG4gICAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICBkaXNwbGF5VG9kbyhjdXJyZW50UHJvamVjdC50b2Rvc1tpXSwgdG9kb3MsIGN1cnJlbnRBY2NvdW50KTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRvZG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgICAgb3BlblRvZG8oZWxlbWVudCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50LCBjdXJyZW50UHJvamVjdCk7XG4gICAgICB9XG4gICAgICB0b2Rvcy5hcHBlbmRDaGlsZChhZGROZXdUb2RvKGN1cnJlbnRQcm9qZWN0LCB0b2RvcywgY3VycmVudEFjY291bnQpKTtcbiAgICB9KTtcblxuICAgIGRvbmVCdXR0b24uaW5uZXJUZXh0ID0gJ0RvbmUnO1xuICAgIGRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyBJZiB0aXRsZSBpcyBlbXB0eSwgc2F2ZSB0aGUgbmV3IGRlc2NyaXB0aW9uIGJ1dCBsZWF2ZSB0aGUgcHJldmlvdXMgdGl0bGUuXG4gICAgICBpZiAodGl0bGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb0NvbnRhaW5lcik7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24udmFsdWU7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLnRpdGxlID0gdGl0bGUudmFsdWU7XG4gICAgICBjdXJyZW50UHJvamVjdC50b2Rvc1tpbmRleF0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zW2luZGV4XS5kdWVEYXRlID0gZHVlRGF0ZS52YWx1ZTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKHRvZG9Db250YWluZXIpO1xuICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKVswXS5pbm5lclRleHQgPSB0aXRsZS52YWx1ZTtcbiAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2JylbMV0uaW5uZXJUZXh0ID0gZHVlRGF0ZS52YWx1ZTtcblxuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIH0pO1xuICAgIHRvZG9zLmluc2VydEJlZm9yZSh0b2RvQ29udGFpbmVyLCB0b2Rvcy5jaGlsZHJlbltpbmRleF0pO1xuICB9KTtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tdG9kb3MtYmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWZnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogI2M0YzRjNDtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxNDYsIDE0NiwgMTQ2KTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjYWFhYWFhO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46IGdyZWVuO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxufVxcblxcbjpyb290LmxpZ2h0IHtcXG4gIC0tdG9kb3MtYmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWZnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogI2M0YzRjNDtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxNDYsIDE0NiwgMTQ2KTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjYWFhYWFhO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46IGdyZWVuO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxufVxcblxcbjpyb290LmRhcmsge1xcbiAgLS10b2Rvcy1iZzogIzI0MjkyRTtcXG4gIC0tdG9kb3MtZmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWRpdmlkZXI6IGdyZXk7XFxuICAtLXByb2plY3RzLWJnOiAjMUYyNDI4O1xcbiAgLS1wcm9qZWN0cy1zZWxlY3RlZC1iZzogcmdiKDExMiwgMTEyLCAxMTIpO1xcbiAgLS1kYXNoYm9hcmQtZGl2aWRlcjogYmxhY2s7XFxuICAtLWJ1dHRvbnMtaG92ZXItYmc6ICM0MTQ5NTA7XFxuICAtLXRvZG8tYm9yZGVyOiByZ2IoMTMzLCAxMzMsIDEzMyk7XFxuICAtLXRvZG8tZGF0ZS1ncmVlbjogIzcyZmY3MjtcXG4gIC0tdG9kby10aXRsZS1iZzogdHJhbnNwYXJlbnQ7XFxuICBjb2xvci1zY2hlbWU6IGRhcms7XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIgYnV0dG9uLCAjYWRkLXByb2plY3QtYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jdG9kb3MtY29udGFpbmVyIGJ1dHRvbjpob3ZlciwgI2FkZC1wcm9qZWN0LWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1idXR0b25zLWhvdmVyLWJnKTtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuXFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5cXG4uZGFzaGJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgzMDBweCwgNDAwcHgpO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG59XFxuXFxubGkge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxudWwge1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLnByb2plY3RzLWNvbnRhaW5lciB7XFxuICAvKiBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1kYXNoYm9hcmQtZGl2aWRlcik7ICovXFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb2plY3RzLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG5cXG4ucHJvamVjdHMtY29udGFpbmVyIGxpIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIG1hcmdpbjogMC41cmVtIDAgMC41cmVtIDA7XFxufVxcblxcbi5wcm9qZWN0cyAucHJvamVjdCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wcm9qZWN0LnNlbGVjdGVkLXByb2plY3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJvamVjdHMtc2VsZWN0ZWQtYmcpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG5cXG4ucHJvamVjdC1tZW51IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ucHJvamVjdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnByb2plY3QtYnV0dG9ucyBidXR0b24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuXFxufVxcblxcbiNkZWxldGUtcHJvamVjdDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk3LCA3NywgNzcpO1xcbn1cXG5cXG4uZGVsZXRlLXByb2plY3Qge1xcbiAgd2lkdGg6IDJyZW07XFxuICBoZWlnaHQ6IDJyZW07XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIge1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10b2Rvcy1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBwYWRkaW5nLXRvcDogMTB2aDtcXG59XFxuXFxuI2lubmVyLXByb2plY3QtdGl0bGUge1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICBmb250LXdlaWdodDogODAwO1xcbn1cXG5cXG4jdG9kb3Mge1xcbiAgd2lkdGg6IDgwJTtcXG4gIG1heC13aWR0aDogODAwcHg7XFxufVxcblxcbmxpIC5jaGVja2JveCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm9qZWN0cy1iZyk7XFxufVxcblxcbi50b2RvLXNlY3Rpb24ge1xcbiAgcGFkZGluZzogMS4xcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMS4xcmVtO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0b2RvLXRpdGxlLCAjdG9kby1kZXNjcmlwdGlvbiB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10b2RvLWJvcmRlcik7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgcmVzaXplOiBub25lO1xcbn1cXG5cXG4jdG9kby1idXR0b25zIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbiN0b2RvLWJ1dHRvbnMgYnV0dG9uIHtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuI3RvZG8tdGl0bGUge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG9kby10aXRsZS1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuI3RvZG8tYnV0dG9ucyAjcmVtb3ZlLXRhc2stYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTcsIDc3LCA3Nyk7XFxufVxcblxcbiN0b2RvLWRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRvZG8tdGl0bGUtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGhlaWdodDogNXJlbTtcXG59XFxuXFxuI3RvZG8tdGl0bGU6Zm9jdXMsICN0b2RvLWRlc2NyaXB0aW9uOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbiN0b2RvcyBsaSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIHBhZGRpbmc6IDEuMXJlbSAwIDEuMXJlbSAxLjFyZW07XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxufVxcblxcbiN0b2RvcyBsaTpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNoZWNrYm94IHtcXG4gIHdpZHRoOiAxLjVyZW07XFxuICBoZWlnaHQ6IDEuNXJlbTtcXG59XFxuXFxuLmFkZC10b2RvIHtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG59XFxuXFxuLmNyZWF0ZS10b2RvLWZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0b2RvLXRpdGxlLWlucHV0IHtcXG4gIHdpZHRoOiAzMHJlbTtcXG59XFxuXFxuI3RvZG8tZGVzY3JpcHRpb24taW5wdXQge1xcbiAgaGVpZ2h0OiA1cmVtO1xcbiAgd2lkdGg6IDMwcmVtO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUdBO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLDBDQUEwQztFQUMxQywwQkFBMEI7RUFDMUIsMkJBQTJCO0VBQzNCLGlDQUFpQztFQUNqQyx3QkFBd0I7RUFDeEIsNEJBQTRCO0VBQzVCLG1CQUFtQjtBQUNy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J2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvJmRpc3BsYXk9c3dhcCcpO1xcblxcblxcbjpyb290IHtcXG4gIC0tdG9kb3MtYmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWZnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogI2M0YzRjNDtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxNDYsIDE0NiwgMTQ2KTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjYWFhYWFhO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46IGdyZWVuO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxufVxcblxcbjpyb290LmxpZ2h0IHtcXG4gIC0tdG9kb3MtYmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWZnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1kaXZpZGVyOiBncmV5O1xcbiAgLS1wcm9qZWN0cy1iZzogI2M0YzRjNDtcXG4gIC0tcHJvamVjdHMtc2VsZWN0ZWQtYmc6IHJnYigxNDYsIDE0NiwgMTQ2KTtcXG4gIC0tZGFzaGJvYXJkLWRpdmlkZXI6IGJsYWNrO1xcbiAgLS1idXR0b25zLWhvdmVyLWJnOiAjYWFhYWFhO1xcbiAgLS10b2RvLWJvcmRlcjogcmdiKDEzMywgMTMzLCAxMzMpO1xcbiAgLS10b2RvLWRhdGUtZ3JlZW46IGdyZWVuO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxufVxcblxcbjpyb290LmRhcmsge1xcbiAgLS10b2Rvcy1iZzogIzI0MjkyRTtcXG4gIC0tdG9kb3MtZmc6ICNFMkUyRTI7XFxuICAtLXRvZG9zLWRpdmlkZXI6IGdyZXk7XFxuICAtLXByb2plY3RzLWJnOiAjMUYyNDI4O1xcbiAgLS1wcm9qZWN0cy1zZWxlY3RlZC1iZzogcmdiKDExMiwgMTEyLCAxMTIpO1xcbiAgLS1kYXNoYm9hcmQtZGl2aWRlcjogYmxhY2s7XFxuICAtLWJ1dHRvbnMtaG92ZXItYmc6ICM0MTQ5NTA7XFxuICAtLXRvZG8tYm9yZGVyOiByZ2IoMTMzLCAxMzMsIDEzMyk7XFxuICAtLXRvZG8tZGF0ZS1ncmVlbjogIzcyZmY3MjtcXG4gIC0tdG9kby10aXRsZS1iZzogdHJhbnNwYXJlbnQ7XFxuICBjb2xvci1zY2hlbWU6IGRhcms7XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIgYnV0dG9uLCAjYWRkLXByb2plY3QtYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgcGFkZGluZzogMC41cmVtO1xcbn1cXG5cXG4jdG9kb3MtY29udGFpbmVyIGJ1dHRvbjpob3ZlciwgI2FkZC1wcm9qZWN0LWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1idXR0b25zLWhvdmVyLWJnKTtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuXFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG5cXG4uZGFzaGJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgzMDBweCwgNDAwcHgpO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG59XFxuXFxubGkge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuXFxudWwge1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLnByb2plY3RzLWNvbnRhaW5lciB7XFxuICAvKiBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1kYXNoYm9hcmQtZGl2aWRlcik7ICovXFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGdyaWQtcm93OiAxIC8gMjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb2plY3RzLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBwYWRkaW5nOiAycmVtO1xcbn1cXG5cXG4ucHJvamVjdHMtY29udGFpbmVyIGxpIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIG1hcmdpbjogMC41cmVtIDAgMC41cmVtIDA7XFxufVxcblxcbi5wcm9qZWN0cyAucHJvamVjdCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5wcm9qZWN0LnNlbGVjdGVkLXByb2plY3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJvamVjdHMtc2VsZWN0ZWQtYmcpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbn1cXG5cXG4ucHJvamVjdC1tZW51IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4ucHJvamVjdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnByb2plY3QtYnV0dG9ucyBidXR0b24ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuXFxufVxcblxcbiNkZWxldGUtcHJvamVjdDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk3LCA3NywgNzcpO1xcbn1cXG5cXG4uZGVsZXRlLXByb2plY3Qge1xcbiAgd2lkdGg6IDJyZW07XFxuICBoZWlnaHQ6IDJyZW07XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIge1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10b2Rvcy1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBwYWRkaW5nLXRvcDogMTB2aDtcXG59XFxuXFxuI2lubmVyLXByb2plY3QtdGl0bGUge1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICBmb250LXdlaWdodDogODAwO1xcbn1cXG5cXG4jdG9kb3Mge1xcbiAgd2lkdGg6IDgwJTtcXG4gIG1heC13aWR0aDogODAwcHg7XFxufVxcblxcbmxpIC5jaGVja2JveCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm9qZWN0cy1iZyk7XFxufVxcblxcbi50b2RvLXNlY3Rpb24ge1xcbiAgcGFkZGluZzogMS4xcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMS4xcmVtO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRvZG9zLWRpdmlkZXIpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0b2RvLXRpdGxlLCAjdG9kby1kZXNjcmlwdGlvbiB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byc7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10b2RvLWJvcmRlcik7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgcmVzaXplOiBub25lO1xcbn1cXG5cXG4jdG9kby1idXR0b25zIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbiN0b2RvLWJ1dHRvbnMgYnV0dG9uIHtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuI3RvZG8tdGl0bGUge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG9kby10aXRsZS1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuI3RvZG8tYnV0dG9ucyAjcmVtb3ZlLXRhc2stYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTcsIDc3LCA3Nyk7XFxufVxcblxcbiN0b2RvLWRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRvZG8tdGl0bGUtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIGhlaWdodDogNXJlbTtcXG59XFxuXFxuI3RvZG8tdGl0bGU6Zm9jdXMsICN0b2RvLWRlc2NyaXB0aW9uOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbiN0b2RvcyBsaSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIHBhZGRpbmc6IDEuMXJlbSAwIDEuMXJlbSAxLjFyZW07XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxufVxcblxcbiN0b2RvcyBsaTpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNoZWNrYm94IHtcXG4gIHdpZHRoOiAxLjVyZW07XFxuICBoZWlnaHQ6IDEuNXJlbTtcXG59XFxuXFxuLmFkZC10b2RvIHtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG59XFxuXFxuLmNyZWF0ZS10b2RvLWZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0b2RvLXRpdGxlLWlucHV0IHtcXG4gIHdpZHRoOiAzMHJlbTtcXG59XFxuXFxuI3RvZG8tZGVzY3JpcHRpb24taW5wdXQge1xcbiAgaGVpZ2h0OiA1cmVtO1xcbiAgd2lkdGg6IDMwcmVtO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJjcmVhdGVEZW1vIiwiYWRkTmV3UHJvamVjdCIsImRpc3BsYXlQcm9qZWN0Iiwic3dpdGNoUHJvamVjdCIsImFkZE5ld1RvZG8iLCJvcGVuVG9kbyIsImRpc3BsYXlUb2RvIiwiZGFzaGJvYXJkIiwiY29udGVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInByb2plY3RzQ29udGFpbmVyIiwic2lkZWJhciIsInRvZG9zQ29udGFpbmVyIiwidG9kb3MiLCJ0aGVtZVRvZ2dsZSIsImlubmVySFRNTCIsImRlbW9BY2NvdW50IiwiaW5ib3giLCJjdXJyZW50UHJvamVjdCIsImxvY2FsU3RvcmFnZSIsImNsZWFyIiwiYWRkUHJvamVjdCIsImNsYXNzTmFtZSIsImlkIiwidG9kbyIsImFwcGVuZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb290IiwiZG9jdW1lbnRFbGVtZW50IiwibmV3VGhlbWUiLCJjb25zb2xlIiwibG9nIiwicXVlcnlTZWxlY3RvciIsInByb2plY3QiLCJwcm9qZWN0cyIsImNsYXNzTGlzdCIsImFkZCIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiZWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcm9qZWN0VGl0bGUiLCJmaXJzdENoaWxkIiwiYmVmb3JlIiwiYm9keSIsImFjY291bnQiLCJuYW1lIiwicHVzaCIsInRpdGxlIiwiYWRkVG9kbyIsImRlc2NyaXB0aW9uIiwiZHVlRGF0ZSIsIkRhdGUiLCJjb21wbGV0ZWQiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwidG9TdHJpbmciLCJwYWRTdGFydCIsImdldERhdGUiLCJqb2luIiwid2Vic2l0ZSIsIm15VG9kbyIsImNvbXBsZXRlZFRvZG8iLCJoYWxmRmlsbGVkVG9kbyIsIm15VG9kbzEiLCJ3ZWJzaXRlVG9kbyIsIndlYnNpdGVUb2RvMSIsImN1cnJlbnRBY2NvdW50IiwicHJvamVjdERpc3BsYXkiLCJtZW51IiwiZSIsInByb2plY3RNZW51IiwiY29udGFpbnMiLCJyZW1vdmVDaGlsZCIsInByb2plY3RJbnB1dCIsInByb2plY3RTdWJtaXQiLCJ2YWx1ZSIsIm5ld1Byb2plY3QiLCJhcHBlbmRDaGlsZCIsImV2ZW50Iiwia2V5IiwicHJldmVudERlZmF1bHQiLCJnZXRFbGVtZW50QnlJZCIsImNsaWNrIiwicHJvamVjdEVsZW1lbnQiLCJwcm9qZWN0Tm9kZXMiLCJBcnJheSIsImZyb20iLCJjaGlsZHJlbiIsInRhcmdldCIsInRhZ05hbWUiLCJyZW1vdmUiLCJpbmRleCIsImluZGV4T2YiLCJub2RlcyIsInByb2plY3RUaXRsZUlucHV0IiwiYnV0dG9uc0NvbnRhaW5lciIsImRvbmVCdXR0b24iLCJkZWxldGVCdXR0b24iLCJwYXJlbnRFbGVtZW50Iiwic3BsaWNlIiwiaSIsImxhc3RDaGlsZCIsInJlc3VsdFByb2plY3REaXNwbGF5IiwidG9kb0Rpc3BsYXkiLCJ0b2RvVGl0bGUiLCJjaGVja2JveCIsInRvZG9EYXRlIiwic2V0QXR0cmlidXRlIiwiY3VycmVudERhdGUiLCJzdHlsZSIsImNvbG9yIiwiY2hlY2tlZCIsInRleHREZWNvcmF0aW9uIiwiY3JlYXRlVG9kb0NvbnRhaW5lciIsInRvZG9UaXRsZUxhYmVsIiwidG9kb0lucHV0VGl0bGUiLCJ0b2RvRGVzY3JpcHRpb25MYWJlbCIsInRvZG9JbnB1dERlc2NyaXB0aW9uIiwidG9kb0lucHV0RGF0ZSIsInRvZG9TdWJtaXQiLCJmb3IiLCJuZXdUb2RvVGl0bGUiLCJuZXdUb2RvRGVzY3JpcHRpb24iLCJuZXdUb2RvRGF0ZSIsIm5ld1RvZG8iLCJkaXNwbGF5IiwidG9kb0NvbnRhaW5lciIsInJlbW92ZUJ1dHRvbiIsImlubmVyVGV4dCIsImluc2VydEJlZm9yZSJdLCJzb3VyY2VSb290IjoiIn0=