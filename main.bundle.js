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

  if (localStorage.getItem('user') !== null) {
    demoAccount = JSON.parse(localStorage.getItem('user'));
    currentProject = demoAccount.projects[0];
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVPLFNBQVNPLFNBQVQsR0FBcUI7RUFDMUIsSUFBSUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDtFQUNBLElBQUlDLGlCQUFpQixHQUFHRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBeEI7RUFDQSxJQUFJRSxPQUFPLEdBQUdILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUF2QixDQUFkO0VBQ0EsSUFBSUcsY0FBYyxHQUFHSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBckI7RUFDQSxJQUFJSSxLQUFLLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUF2QixDQUFaO0VBQ0EsSUFBSUssV0FBVyxHQUFHTixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBbEI7RUFDQUssV0FBVyxDQUFDQyxTQUFaLEdBQXdCLGNBQXhCO0VBRUEsSUFBSTtJQUFFQyxXQUFGO0lBQWVDO0VBQWYsSUFBeUJsQixxREFBVSxFQUF2QztFQUNBLElBQUltQixjQUFjLEdBQUdELEtBQXJCOztFQUVBLElBQUlFLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixNQUFyQixNQUFpQyxJQUFyQyxFQUEyQztJQUN6Q0osV0FBVyxHQUFHSyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsWUFBWSxDQUFDQyxPQUFiLENBQXFCLE1BQXJCLENBQVgsQ0FBZDtJQUNBRixjQUFjLEdBQUdGLFdBQVcsQ0FBQ08sUUFBWixDQUFxQixDQUFyQixDQUFqQjtFQUNEOztFQUVELElBQUlDLFVBQVUsR0FBR3hCLDJEQUFhLENBQUNXLE9BQUQsRUFBVUssV0FBVixFQUF1QkgsS0FBdkIsQ0FBOUI7RUFDQUgsaUJBQWlCLENBQUNlLFNBQWxCLEdBQThCLG9CQUE5QjtFQUNBZCxPQUFPLENBQUNjLFNBQVIsR0FBb0IsVUFBcEI7RUFDQWIsY0FBYyxDQUFDYyxFQUFmLEdBQW9CLGlCQUFwQjtFQUNBYixLQUFLLENBQUNhLEVBQU4sR0FBVyxPQUFYOztFQUVBLEtBQUssTUFBTUMsSUFBWCxJQUFtQlQsY0FBYyxDQUFDTCxLQUFsQyxFQUF5QztJQUN2Q1Isc0RBQVcsQ0FBQ3NCLElBQUQsRUFBT2QsS0FBUCxFQUFjRyxXQUFkLEVBQTJCRSxjQUEzQixDQUFYO0VBQ0Q7O0VBQ0RMLEtBQUssQ0FBQ2UsTUFBTixDQUFhekIscURBQVUsQ0FBQ2UsY0FBRCxFQUFpQkwsS0FBakIsRUFBd0JHLFdBQXhCLENBQXZCO0VBRUFGLFdBQVcsQ0FBQ2UsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsTUFBTTtJQUMxQyxNQUFNQyxJQUFJLEdBQUd0QixRQUFRLENBQUN1QixlQUF0QjtJQUNBLE1BQU1DLFFBQVEsR0FBR0YsSUFBSSxDQUFDTCxTQUFMLEtBQW1CLE1BQW5CLEdBQTRCLE9BQTVCLEdBQXNDLE1BQXZEO0lBQ0FLLElBQUksQ0FBQ0wsU0FBTCxHQUFpQk8sUUFBakIsQ0FIMEMsQ0FJMUM7O0lBQ0FDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMUIsUUFBUSxDQUFDMkIsYUFBVCxDQUF1QixNQUF2QixDQUFaO0VBQ0QsQ0FORDtFQVFBekIsaUJBQWlCLENBQUNrQixNQUFsQixDQUF5QmQsV0FBekI7O0VBQ0EsS0FBSyxNQUFNc0IsT0FBWCxJQUFzQnBCLFdBQVcsQ0FBQ08sUUFBbEMsRUFBNEM7SUFDMUNaLE9BQU8sQ0FBQ2lCLE1BQVIsQ0FBZTNCLDREQUFjLENBQUNtQyxPQUFELEVBQVV6QixPQUFWLEVBQW1CSyxXQUFuQixFQUFnQ0gsS0FBaEMsQ0FBN0I7RUFDRDs7RUFDREYsT0FBTyxDQUFDd0IsYUFBUixDQUFzQixJQUF0QixFQUE0QkUsU0FBNUIsQ0FBc0NDLEdBQXRDLENBQTBDLGtCQUExQztFQUVBM0IsT0FBTyxDQUFDaUIsTUFBUixDQUFlSixVQUFmO0VBQ0FaLGNBQWMsQ0FBQ2dCLE1BQWYsQ0FBc0JmLEtBQXRCO0VBQ0FILGlCQUFpQixDQUFDa0IsTUFBbEIsQ0FBeUJqQixPQUF6QjtFQUNBSixPQUFPLENBQUNrQixTQUFSLEdBQW9CLFdBQXBCO0VBQ0FsQixPQUFPLENBQUNxQixNQUFSLENBQWVsQixpQkFBZjtFQUNBSCxPQUFPLENBQUNxQixNQUFSLENBQWVoQixjQUFmO0VBQ0FPLFlBQVksQ0FBQ29CLE9BQWIsQ0FBcUIsTUFBckIsRUFBNkJsQixJQUFJLENBQUNtQixTQUFMLENBQWV4QixXQUFmLENBQTdCOztFQUVBLEtBQUssTUFBTXlCLE9BQVgsSUFBc0I1QixLQUFLLENBQUM2QixnQkFBTixDQUF1QixJQUF2QixDQUF0QixFQUFvRDtJQUNsRHRDLG1EQUFRLENBQUNxQyxPQUFELEVBQVU1QixLQUFWLEVBQWlCRyxXQUFqQixFQUE4QkUsY0FBOUIsQ0FBUjtFQUNEOztFQUVELEtBQUssTUFBTXVCLE9BQVgsSUFBc0I5QixPQUFPLENBQUMrQixnQkFBUixDQUF5QixJQUF6QixDQUF0QixFQUFzRDtJQUNwRHhDLDJEQUFhLENBQUN1QyxPQUFELEVBQVU5QixPQUFWLEVBQW1CRSxLQUFuQixFQUEwQkcsV0FBMUIsQ0FBYjtFQUNEOztFQUVELElBQUkyQixZQUFZLEdBQUduQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7RUFDQWtDLFlBQVksQ0FBQ2pCLEVBQWIsR0FBa0IscUJBQWxCO0VBQ0FpQixZQUFZLENBQUM1QixTQUFiLEdBQXlCSixPQUFPLENBQUNpQyxVQUFSLENBQW1CQSxVQUFuQixDQUE4QjdCLFNBQXZEO0VBQ0FGLEtBQUssQ0FBQ2dDLE1BQU4sQ0FBYUYsWUFBYjtFQUVBLE9BQU9wQyxPQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUNwRUQ7QUFDQTtBQUVBQyxRQUFRLENBQUNzQyxJQUFULENBQWNsQixNQUFkLENBQXFCdEIsd0RBQVMsRUFBOUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSE8sU0FBU3lDLE9BQVQsQ0FBaUJDLElBQWpCLEVBQXVCO0VBQzVCLElBQUl6QixRQUFRLEdBQUcsRUFBZjs7RUFDQSxTQUFTQyxVQUFULENBQW9CWSxPQUFwQixFQUE2QjtJQUMzQmIsUUFBUSxDQUFDMEIsSUFBVCxDQUFjYixPQUFkO0VBQ0Q7O0VBQ0QsT0FBTztJQUFFWixVQUFGO0lBQWNELFFBQWQ7SUFBd0J5QjtFQUF4QixDQUFQO0FBQ0Q7QUFFTSxTQUFTWixPQUFULENBQWlCYyxLQUFqQixFQUF3QjtFQUM3QixJQUFJckMsS0FBSyxHQUFHLEVBQVo7O0VBQ0EsU0FBU3NDLE9BQVQsQ0FBaUJ4QixJQUFqQixFQUF1QjtJQUNyQmQsS0FBSyxDQUFDb0MsSUFBTixDQUFXdEIsSUFBWDtFQUNEOztFQUNELE9BQU87SUFBRW9CLE9BQUY7SUFBV0ksT0FBWDtJQUFvQnRDLEtBQXBCO0lBQTJCcUM7RUFBM0IsQ0FBUDtBQUNEO0FBRU0sU0FBU3ZCLElBQVQsR0FBK0c7RUFBQSxJQUFqR3VCLEtBQWlHLHVFQUF6RixZQUF5RjtFQUFBLElBQTNFRSxXQUEyRSx1RUFBN0Qsa0JBQTZEO0VBQUEsSUFBekNDLE9BQXlDLHVFQUEvQixJQUFJQyxJQUFKLEVBQStCO0VBQUEsSUFBbkJDLFNBQW1CLHVFQUFQLEtBQU87O0VBQ3BILElBQUksT0FBT0YsT0FBUCxJQUFrQixRQUF0QixFQUFnQztJQUM5QkEsT0FBTyxHQUFHLENBQ1JBLE9BQU8sQ0FBQ0csV0FBUixFQURRLEVBRVIsQ0FBQ0gsT0FBTyxDQUFDSSxRQUFSLEtBQW1CLENBQXBCLEVBQXVCQyxRQUF2QixHQUFrQ0MsUUFBbEMsQ0FBMkMsQ0FBM0MsRUFBOEMsR0FBOUMsQ0FGUSxFQUdQTixPQUFPLENBQUNPLE9BQVIsRUFBRCxDQUFvQkYsUUFBcEIsR0FBK0JDLFFBQS9CLENBQXdDLENBQXhDLEVBQTJDLEdBQTNDLENBSFEsRUFJUkUsSUFKUSxDQUlILEdBSkcsQ0FBVjtFQUtEOztFQUNELE9BQU87SUFBRVgsS0FBRjtJQUFTRSxXQUFUO0lBQXNCQyxPQUF0QjtJQUErQkU7RUFBL0IsQ0FBUDtBQUNEO0FBRU0sU0FBU3hELFVBQVQsR0FBc0I7RUFDM0IsTUFBTWlCLFdBQVcsR0FBRytCLE9BQU8sQ0FBQyxTQUFELENBQTNCO0VBQ0EsTUFBTTlCLEtBQUssR0FBR21CLE9BQU8sQ0FBQyxPQUFELENBQXJCO0VBQ0EsTUFBTTBCLE9BQU8sR0FBRzFCLE9BQU8sQ0FBQyxvQkFBRCxDQUF2QjtFQUNBLE1BQU0yQixNQUFNLEdBQUdwQyxJQUFJLENBQUMsY0FBRCxFQUFpQixnQ0FBakIsRUFBbUQsSUFBSTJCLElBQUosRUFBbkQsRUFBK0QsS0FBL0QsQ0FBbkI7RUFDQSxNQUFNVSxhQUFhLEdBQUdyQyxJQUFJLENBQUMsZ0JBQUQsRUFBbUIsd0NBQW5CLEVBQTZELElBQUkyQixJQUFKLEVBQTdELEVBQXlFLElBQXpFLENBQTFCO0VBQ0EsTUFBTVcsY0FBYyxHQUFHdEMsSUFBSSxDQUFDLFdBQUQsRUFBYyw0Q0FBZCxFQUE0RCxJQUFJMkIsSUFBSixFQUE1RCxFQUF3RSxLQUF4RSxDQUEzQjtFQUNBLE1BQU1ZLE9BQU8sR0FBR3ZDLElBQUksRUFBcEI7RUFDQSxNQUFNd0MsV0FBVyxHQUFHeEMsSUFBSSxDQUFDLFVBQUQsRUFBYSxpQ0FBYixFQUFnRCxJQUFJMkIsSUFBSixFQUFoRCxFQUE0RCxLQUE1RCxDQUF4QjtFQUNBLE1BQU1jLFlBQVksR0FBR3pDLElBQUksQ0FBQyxZQUFELEVBQWUsdUNBQWYsRUFBd0QsSUFBSTJCLElBQUosRUFBeEQsRUFBb0UsS0FBcEUsQ0FBekI7RUFFQXRDLFdBQVcsQ0FBQ1EsVUFBWixDQUF1QlAsS0FBdkI7RUFDQUQsV0FBVyxDQUFDUSxVQUFaLENBQXVCc0MsT0FBdkI7RUFDQTdDLEtBQUssQ0FBQ2tDLE9BQU4sQ0FBY2EsYUFBZDtFQUNBL0MsS0FBSyxDQUFDa0MsT0FBTixDQUFjWSxNQUFkO0VBQ0E5QyxLQUFLLENBQUNrQyxPQUFOLENBQWNlLE9BQWQ7RUFDQWpELEtBQUssQ0FBQ2tDLE9BQU4sQ0FBY2MsY0FBZDtFQUNBSCxPQUFPLENBQUNYLE9BQVIsQ0FBZ0JnQixXQUFoQjtFQUNBTCxPQUFPLENBQUNYLE9BQVIsQ0FBZ0JpQixZQUFoQjtFQUNBLE9BQU87SUFBRXBELFdBQUY7SUFBZUM7RUFBZixDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0Q7QUFDQTtBQUVPLFNBQVNoQixjQUFULENBQXdCbUMsT0FBeEIsRUFBaUN6QixPQUFqQyxFQUEwQzBELGNBQTFDLEVBQTBEeEQsS0FBMUQsRUFBaUU7RUFDdEUsSUFBSXlELGNBQWMsR0FBRzlELFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUF2QixDQUFyQjtFQUNBLElBQUlrQyxZQUFZLEdBQUduQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7RUFFQWtDLFlBQVksQ0FBQ2pCLEVBQWIsR0FBa0IsY0FBbEI7RUFDQTRDLGNBQWMsQ0FBQzdDLFNBQWYsR0FBMkIsU0FBM0I7RUFDQWtCLFlBQVksQ0FBQzVCLFNBQWIsR0FBeUJxQixPQUFPLENBQUNjLEtBQWpDO0VBRUEsSUFBSXFCLElBQUksR0FBRy9ELFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixHQUF2QixDQUFYO0VBQ0E4RCxJQUFJLENBQUNsQyxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsVUFBbkI7RUFDQWlDLElBQUksQ0FBQ2xDLFNBQUwsQ0FBZUMsR0FBZixDQUFtQixhQUFuQjtFQUNBaUMsSUFBSSxDQUFDbEMsU0FBTCxDQUFlQyxHQUFmLENBQW1CLE9BQW5CO0VBQ0FpQyxJQUFJLENBQUMxQyxnQkFBTCxDQUFzQixPQUF0QixFQUFnQzJDLENBQUQsSUFBTztJQUNwQ0MsV0FBVyxDQUFDRCxDQUFELEVBQUlGLGNBQUosRUFBb0IzQixZQUFwQixFQUFrQzRCLElBQWxDLEVBQ0M1RCxPQURELEVBQ1V5QixPQURWLEVBQ21CaUMsY0FEbkIsRUFDbUN4RCxLQURuQyxDQUFYO0VBRUQsQ0FIRDtFQUlBeUQsY0FBYyxDQUFDekMsZ0JBQWYsQ0FBZ0MsV0FBaEMsRUFBNkMsTUFBTTtJQUNqRCxJQUFJLENBQUN5QyxjQUFjLENBQUNqQyxTQUFmLENBQXlCcUMsUUFBekIsQ0FBa0MsY0FBbEMsQ0FBTCxFQUNFSixjQUFjLENBQUMxQyxNQUFmLENBQXNCMkMsSUFBdEI7RUFDSCxDQUhEO0VBSUFELGNBQWMsQ0FBQ3pDLGdCQUFmLENBQWdDLFVBQWhDLEVBQTRDLE1BQU07SUFDaEQsSUFBSSxDQUFDeUMsY0FBYyxDQUFDakMsU0FBZixDQUF5QnFDLFFBQXpCLENBQWtDLGNBQWxDLENBQUwsRUFDQUosY0FBYyxDQUFDSyxXQUFmLENBQTJCSixJQUEzQjtFQUNELENBSEQ7RUFJQUQsY0FBYyxDQUFDMUMsTUFBZixDQUFzQmUsWUFBdEI7RUFDQSxPQUFPMkIsY0FBUDtBQUNEO0FBRU0sU0FBU3RFLGFBQVQsQ0FBdUJ1QixRQUF2QixFQUFpQzhDLGNBQWpDLEVBQWlEeEQsS0FBakQsRUFBd0Q7RUFDN0QsSUFBSVcsVUFBVSxHQUFHaEIsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWpCO0VBQ0FlLFVBQVUsQ0FBQ1QsU0FBWCxHQUF1QixpQkFBdkI7RUFDQVMsVUFBVSxDQUFDRSxFQUFYLEdBQWdCLG9CQUFoQjtFQUNBRixVQUFVLENBQUNLLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLE1BQU07SUFDekNOLFFBQVEsQ0FBQ29ELFdBQVQsQ0FBcUJuRCxVQUFyQjtJQUNBLElBQUlvRCxZQUFZLEdBQUdwRSxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBbkI7SUFDQSxJQUFJb0UsYUFBYSxHQUFHckUsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQXBCO0lBQ0FvRSxhQUFhLENBQUM5RCxTQUFkLEdBQTBCLFFBQTFCO0lBQ0E4RCxhQUFhLENBQUNuRCxFQUFkLEdBQW1CLFFBQW5CO0lBQ0FtRCxhQUFhLENBQUNoRCxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxNQUFNO01BQzVDLElBQUkrQyxZQUFZLENBQUNFLEtBQWIsSUFBc0IsRUFBMUIsRUFBOEI7UUFDNUIsSUFBSUMsVUFBVSxHQUFHM0Msa0RBQU8sQ0FBQ3dDLFlBQVksQ0FBQ0UsS0FBZCxDQUF4QjtRQUNBVCxjQUFjLENBQUM5QyxRQUFmLENBQXdCMEIsSUFBeEIsQ0FBNkI4QixVQUE3QjtRQUNBNUQsWUFBWSxDQUFDb0IsT0FBYixDQUFxQixNQUFyQixFQUE2QmxCLElBQUksQ0FBQ21CLFNBQUwsQ0FBZTZCLGNBQWYsQ0FBN0I7UUFDQSxJQUFJQyxjQUFjLEdBQUdyRSxjQUFjLENBQUM4RSxVQUFELEVBQWF4RCxRQUFiLEVBQXVCOEMsY0FBdkIsRUFBdUN4RCxLQUF2QyxDQUFuQztRQUNBVSxRQUFRLENBQUNLLE1BQVQsQ0FBZ0IwQyxjQUFoQixFQUFnQzlDLFVBQWhDO1FBQ0FELFFBQVEsQ0FBQ29ELFdBQVQsQ0FBcUJDLFlBQXJCO1FBQ0FyRCxRQUFRLENBQUNvRCxXQUFULENBQXFCRSxhQUFyQjtRQUVBM0UsYUFBYSxDQUFDb0UsY0FBRCxFQUFpQi9DLFFBQWpCLEVBQTJCVixLQUEzQixFQUFrQ3dELGNBQWxDLENBQWI7TUFDRDs7TUFDRDlDLFFBQVEsQ0FBQ29ELFdBQVQsQ0FBcUJDLFlBQXJCO01BQ0FyRCxRQUFRLENBQUNvRCxXQUFULENBQXFCRSxhQUFyQjtNQUNBdEQsUUFBUSxDQUFDeUQsV0FBVCxDQUFxQnhELFVBQXJCO0lBQ0QsQ0FmRDtJQWdCQUQsUUFBUSxDQUFDSyxNQUFULENBQWdCZ0QsWUFBaEI7SUFDQXJELFFBQVEsQ0FBQ0ssTUFBVCxDQUFnQmlELGFBQWhCO0lBQ0FELFlBQVksQ0FBQy9DLGdCQUFiLENBQThCLFVBQTlCLEVBQTBDLFVBQVNvRCxLQUFULEVBQWdCO01BQ3hELElBQUlBLEtBQUssQ0FBQ0MsR0FBTixJQUFhLE9BQWpCLEVBQTBCO1FBQ3hCRCxLQUFLLENBQUNFLGNBQU47UUFDQTNFLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLEtBQWxDO01BQ0Q7SUFDRixDQUxEO0VBTUQsQ0E5QkQ7RUErQkEsT0FBTzdELFVBQVA7QUFDRDtBQUVNLFNBQVN0QixhQUFULENBQXVCb0YsY0FBdkIsRUFBdUMvRCxRQUF2QyxFQUFpRFYsS0FBakQsRUFBd0R3RCxjQUF4RCxFQUF3RTtFQUM3RTtFQUNBLElBQUlrQixZQUFZLEdBQUdDLEtBQUssQ0FBQ0MsSUFBTixDQUFXbEUsUUFBUSxDQUFDbUUsUUFBcEIsQ0FBbkI7RUFDQUosY0FBYyxDQUFDekQsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUMsVUFBUzJDLENBQVQsRUFBWTtJQUNuRCxJQUFJbUIsTUFBTSxHQUFHbkIsQ0FBQyxDQUFDbUIsTUFBZjs7SUFDQSxJQUFJQSxNQUFNLENBQUNDLE9BQVAsSUFBa0IsS0FBdEIsRUFBNkI7TUFDM0JELE1BQU0sR0FBR0wsY0FBVDtJQUNEOztJQUNELElBQUlLLE1BQU0sQ0FBQ0MsT0FBUCxJQUFrQixHQUF0QixFQUEyQjtNQUN6QkQsTUFBTSxHQUFHTCxjQUFUO0lBQ0Q7O0lBQ0QsSUFBSUssTUFBTSxLQUFLLElBQWYsRUFBcUI7TUFDakI7SUFDSDs7SUFDRCxLQUFLLE1BQU12RCxPQUFYLElBQXNCYixRQUFRLENBQUNtQixnQkFBVCxDQUEwQixJQUExQixDQUF0QixFQUF1RDtNQUNyRE4sT0FBTyxDQUFDQyxTQUFSLENBQWtCd0QsTUFBbEIsQ0FBeUIsa0JBQXpCO0lBQ0Q7O0lBQ0RQLGNBQWMsQ0FBQ2pELFNBQWYsQ0FBeUJDLEdBQXpCLENBQTZCLGtCQUE3QjtJQUVBLElBQUl3RCxLQUFLLEdBQUdQLFlBQVksQ0FBQ1EsT0FBYixDQUFxQkosTUFBckIsQ0FBWjs7SUFDQSxPQUFNOUUsS0FBSyxDQUFDK0IsVUFBWixFQUF3QjtNQUNwQi9CLEtBQUssQ0FBQzhELFdBQU4sQ0FBa0I5RCxLQUFLLENBQUMrQixVQUF4QjtJQUNIOztJQUNELElBQUkxQixjQUFjLEdBQUdtRCxjQUFjLENBQUM5QyxRQUFmLENBQXdCdUUsS0FBeEIsQ0FBckIsQ0FwQm1ELENBc0JuRDs7SUFDQSxJQUFJbEYsY0FBYyxHQUFHSixRQUFRLENBQUM0RSxjQUFULENBQXdCLGlCQUF4QixDQUFyQjs7SUFDQSxJQUFJeEUsY0FBYyxDQUFDOEQsUUFBZixDQUF3QmxFLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IscUJBQXhCLENBQXhCLENBQUosRUFBNkU7TUFDM0V4RSxjQUFjLENBQUMrRCxXQUFmLENBQTJCL0QsY0FBYyxDQUFDZ0MsVUFBMUM7SUFDRDs7SUFDRCxJQUFJRCxZQUFZLEdBQUduQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7SUFDQWtDLFlBQVksQ0FBQ2pCLEVBQWIsR0FBa0IscUJBQWxCO0lBQ0EsSUFBSTRELGNBQWMsQ0FBQzFDLFVBQWYsQ0FBMEJnRCxPQUExQixJQUFxQyxLQUF6QyxFQUNFakQsWUFBWSxDQUFDNUIsU0FBYixHQUF5QnVFLGNBQWMsQ0FBQzFDLFVBQWYsQ0FBMEI3QixTQUFuRDtJQUNGLElBQUl1RSxjQUFjLENBQUMxQyxVQUFmLENBQTBCZ0QsT0FBMUIsSUFBcUMsT0FBekMsRUFDRWpELFlBQVksQ0FBQzVCLFNBQWIsR0FBeUJ1RSxjQUFjLENBQUMxQyxVQUFmLENBQTBCa0MsS0FBbkQ7SUFDRmpFLEtBQUssQ0FBQ2dDLE1BQU4sQ0FBYUYsWUFBYjs7SUFFQSxLQUFLLE1BQU1oQixJQUFYLElBQW1CVCxjQUFjLENBQUNMLEtBQWxDLEVBQXlDO01BQ3ZDUixzREFBVyxDQUFDc0IsSUFBRCxFQUFPZCxLQUFQLEVBQWN3RCxjQUFkLEVBQThCbkQsY0FBOUIsQ0FBWDtJQUNEOztJQUNELEtBQUssTUFBTXVCLE9BQVgsSUFBc0I1QixLQUFLLENBQUM2QixnQkFBTixDQUF1QixJQUF2QixDQUF0QixFQUFvRDtNQUNsRHRDLG1EQUFRLENBQUNxQyxPQUFELEVBQVU1QixLQUFWLEVBQWlCd0QsY0FBakIsRUFBaUNuRCxjQUFqQyxDQUFSO0lBQ0Q7O0lBQ0RMLEtBQUssQ0FBQ2UsTUFBTixDQUFhekIscURBQVUsQ0FBQ2UsY0FBRCxFQUFpQkwsS0FBakIsRUFBd0J3RCxjQUF4QixDQUF2QjtJQUNBLE9BQU95QixLQUFQO0VBQ0QsQ0EzQ0Q7QUE0Q0Q7QUFFTSxTQUFTckIsV0FBVCxDQUFxQkQsQ0FBckIsRUFBd0JGLGNBQXhCLEVBQXdDM0IsWUFBeEMsRUFBc0Q0QixJQUF0RCxFQUNxQmhELFFBRHJCLEVBQytCYSxPQUQvQixFQUN3Q2lDLGNBRHhDLEVBQ3dEeEQsS0FEeEQsRUFDK0Q7RUFDcEUsSUFBSW1GLEtBQUssR0FBR1IsS0FBSyxDQUFDQyxJQUFOLENBQVdsRSxRQUFRLENBQUNtRSxRQUFwQixDQUFaO0VBQ0EsSUFBSU8saUJBQWlCLEdBQUd6RixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBeEI7RUFDQSxJQUFJeUYsZ0JBQWdCLEdBQUcxRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBdkI7RUFDQSxJQUFJMEYsVUFBVSxHQUFHM0YsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWpCO0VBQ0EsSUFBSTJGLFlBQVksR0FBRzVGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFuQjtFQUNBLElBQUlxRixLQUFLLEdBQUdFLEtBQUssQ0FBQ0QsT0FBTixDQUFjdkIsQ0FBQyxDQUFDbUIsTUFBRixDQUFTVSxhQUF2QixDQUFaO0VBQ0E3QixDQUFDLENBQUNtQixNQUFGLENBQVNVLGFBQVQsQ0FBdUJoRSxTQUF2QixDQUFpQ0MsR0FBakMsQ0FBcUMsY0FBckM7RUFDQThELFlBQVksQ0FBQzFFLEVBQWIsR0FBa0IsZ0JBQWxCO0VBQ0F5RSxVQUFVLENBQUN6RSxFQUFYLEdBQWdCLGdCQUFoQjtFQUNBeUUsVUFBVSxDQUFDcEYsU0FBWCxHQUF1QixNQUF2QjtFQUNBcUYsWUFBWSxDQUFDckYsU0FBYixHQUF5QixRQUF6QjtFQUNBbUYsZ0JBQWdCLENBQUN6RSxTQUFqQixHQUE2QixpQkFBN0I7RUFDQXdFLGlCQUFpQixDQUFDbkIsS0FBbEIsR0FBMEIxQyxPQUFPLENBQUNjLEtBQWxDO0VBQ0FnRCxnQkFBZ0IsQ0FBQ3RFLE1BQWpCLENBQXdCd0UsWUFBeEIsRUFBc0NELFVBQXRDO0VBQ0E3QixjQUFjLENBQUNLLFdBQWYsQ0FBMkJoQyxZQUEzQjtFQUNBMkIsY0FBYyxDQUFDSyxXQUFmLENBQTJCSixJQUEzQjtFQUNBRCxjQUFjLENBQUMxQyxNQUFmLENBQXNCcUUsaUJBQXRCLEVBQXlDQyxnQkFBekM7RUFFQUUsWUFBWSxDQUFDdkUsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBd0MyQyxDQUFELElBQU87SUFDNUNILGNBQWMsQ0FBQzlDLFFBQWYsQ0FBd0IrRSxNQUF4QixDQUErQlIsS0FBL0IsRUFBc0MsQ0FBdEM7SUFDQXZFLFFBQVEsQ0FBQ29ELFdBQVQsQ0FBcUJMLGNBQXJCO0lBQ0FuRCxZQUFZLENBQUNvQixPQUFiLENBQXFCLE1BQXJCLEVBQTZCbEIsSUFBSSxDQUFDbUIsU0FBTCxDQUFlNkIsY0FBZixDQUE3QjtJQUNBLElBQUlrQyxDQUFDLEdBQUcsQ0FBUjtJQUNBaEYsUUFBUSxDQUFDb0QsV0FBVCxDQUFxQnBELFFBQVEsQ0FBQ2lGLFNBQTlCOztJQUNBLEtBQUssTUFBTS9ELE9BQVgsSUFBc0JsQixRQUFRLENBQUNtQixnQkFBVCxDQUEwQixJQUExQixDQUF0QixFQUF1RDtNQUNyRG5CLFFBQVEsQ0FBQ29ELFdBQVQsQ0FBcUJsQyxPQUFyQjtNQUNBbEIsUUFBUSxDQUFDSyxNQUFULENBQWdCM0IsY0FBYyxDQUFDb0UsY0FBYyxDQUFDOUMsUUFBZixDQUF3QmdGLENBQXhCLENBQUQsRUFBNkJoRixRQUE3QixFQUF1QzhDLGNBQXZDLEVBQXVEeEQsS0FBdkQsQ0FBOUI7TUFDQTBGLENBQUM7SUFDRjs7SUFDRCxLQUFLLE1BQU05RCxPQUFYLElBQXNCbEIsUUFBUSxDQUFDbUIsZ0JBQVQsQ0FBMEIsSUFBMUIsQ0FBdEIsRUFBdUQ7TUFDckRULE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7TUFDQWhDLGFBQWEsQ0FBQ3VDLE9BQUQsRUFBVWxCLFFBQVYsRUFBb0JWLEtBQXBCLEVBQTJCd0QsY0FBM0IsQ0FBYjtJQUNEOztJQUNEOUMsUUFBUSxDQUFDeUQsV0FBVCxDQUFxQmhGLGFBQWEsQ0FBQ3VCLFFBQUQsRUFBVzhDLGNBQVgsRUFBMkJ4RCxLQUEzQixDQUFsQztFQUNELENBaEJEO0VBa0JBc0YsVUFBVSxDQUFDdEUsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsTUFBTTtJQUN6QyxJQUFJb0UsaUJBQWlCLENBQUNuQixLQUFsQixJQUEyQixFQUEvQixFQUFtQztNQUNqQ1QsY0FBYyxDQUFDOUMsUUFBZixDQUF3QnVFLEtBQXhCLEVBQStCNUMsS0FBL0IsR0FBdUMrQyxpQkFBaUIsQ0FBQ25CLEtBQXpEO01BQ0EzRCxZQUFZLENBQUNvQixPQUFiLENBQXFCLE1BQXJCLEVBQTZCbEIsSUFBSSxDQUFDbUIsU0FBTCxDQUFlNkIsY0FBZixDQUE3QjtJQUNEOztJQUNDLElBQUlvQyxvQkFBb0IsR0FBR3hHLGNBQWMsQ0FBQ21DLE9BQUQsRUFBVWIsUUFBVixFQUFvQjhDLGNBQXBCLEVBQW9DeEQsS0FBcEMsQ0FBekM7SUFDQSxJQUFJeUQsY0FBYyxDQUFDakMsU0FBZixDQUF5QnFDLFFBQXpCLENBQWtDLGtCQUFsQyxDQUFKLEVBQ0UrQixvQkFBb0IsQ0FBQ3BFLFNBQXJCLENBQStCQyxHQUEvQixDQUFtQyxrQkFBbkM7SUFDRmdDLGNBQWMsQ0FBQ3pCLE1BQWYsQ0FBc0I0RCxvQkFBdEI7SUFDQXZHLGFBQWEsQ0FBQ3VHLG9CQUFELEVBQXVCbEYsUUFBdkIsRUFBaUNWLEtBQWpDLEVBQXdDd0QsY0FBeEMsQ0FBYjtJQUNBOUMsUUFBUSxDQUFDb0QsV0FBVCxDQUFxQkwsY0FBckI7RUFDSCxDQVhEO0VBYUEyQixpQkFBaUIsQ0FBQ3BFLGdCQUFsQixDQUFtQyxVQUFuQyxFQUErQyxVQUFTb0QsS0FBVCxFQUFnQjtJQUM3RCxJQUFJQSxLQUFLLENBQUNDLEdBQU4sSUFBYSxPQUFqQixFQUEwQjtNQUN4QkQsS0FBSyxDQUFDRSxjQUFOO01BQ0EzRSxRQUFRLENBQUM0RSxjQUFULENBQXdCLGdCQUF4QixFQUEwQ0MsS0FBMUM7SUFDRDtFQUNGLENBTEQ7QUFPRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoTEQ7QUFFTyxTQUFTaEYsV0FBVCxDQUFxQnNCLElBQXJCLEVBQTJCZCxLQUEzQixFQUFrQ3dELGNBQWxDLEVBQWtEO0VBQ3ZELElBQUlxQyxXQUFXLEdBQUdsRyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBbEI7RUFDQSxJQUFJa0csU0FBUyxHQUFHbkcsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0VBQ0EsSUFBSW1HLFFBQVEsR0FBR3BHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFmO0VBQ0EsSUFBSW9HLFFBQVEsR0FBR3JHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFmO0VBQ0FtRyxRQUFRLENBQUNFLFlBQVQsQ0FBc0IsTUFBdEIsRUFBOEIsVUFBOUI7RUFDQUYsUUFBUSxDQUFDbkYsU0FBVCxHQUFxQixVQUFyQjtFQUNBa0YsU0FBUyxDQUFDakYsRUFBVixHQUFlLHFCQUFmO0VBQ0FtRixRQUFRLENBQUNuRixFQUFULEdBQWMsV0FBZDtFQUNBaUYsU0FBUyxDQUFDNUYsU0FBVixHQUFzQlksSUFBSSxDQUFDdUIsS0FBM0I7RUFDQTJELFFBQVEsQ0FBQzlGLFNBQVQsR0FBcUJZLElBQUksQ0FBQzBCLE9BQTFCO0VBRUEsSUFBSTBELFdBQVcsR0FBRyxJQUFJekQsSUFBSixFQUFsQjtFQUNBeUQsV0FBVyxHQUFHLENBQUNBLFdBQVcsQ0FBQ3ZELFdBQVosRUFBRCxFQUNDLENBQUN1RCxXQUFXLENBQUN0RCxRQUFaLEtBQXlCLENBQTFCLEVBQTZCQyxRQUE3QixHQUF3Q0MsUUFBeEMsQ0FBaUQsQ0FBakQsRUFBb0QsR0FBcEQsQ0FERCxFQUVFb0QsV0FBVyxDQUFDbkQsT0FBWixFQUFELENBQXdCRixRQUF4QixHQUFtQ0MsUUFBbkMsQ0FBNEMsQ0FBNUMsRUFBK0MsR0FBL0MsQ0FGRCxFQUdFRSxJQUhGLENBR08sR0FIUCxDQUFkOztFQUlBLElBQUlsQyxJQUFJLENBQUMwQixPQUFMLElBQWdCMEQsV0FBcEIsRUFBaUM7SUFDL0JGLFFBQVEsQ0FBQ0csS0FBVCxDQUFlQyxLQUFmLEdBQXVCLHdCQUF2QjtFQUNEOztFQUNEUCxXQUFXLENBQUMxQixXQUFaLENBQXdCNEIsUUFBeEI7RUFDQUYsV0FBVyxDQUFDMUIsV0FBWixDQUF3QjJCLFNBQXhCO0VBQ0FELFdBQVcsQ0FBQzFCLFdBQVosQ0FBd0I2QixRQUF4Qjs7RUFDQSxJQUFJbEYsSUFBSSxDQUFDNEIsU0FBVCxFQUFvQjtJQUNsQnFELFFBQVEsQ0FBQ00sT0FBVCxHQUFtQixJQUFuQjtJQUNBUixXQUFXLENBQUNNLEtBQVosQ0FBa0JHLGNBQWxCLEdBQW1DLGNBQW5DO0VBQ0Q7O0VBQ0RQLFFBQVEsQ0FBQy9FLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLFlBQVc7SUFDN0MsSUFBSSxLQUFLcUYsT0FBVCxFQUFrQjtNQUNoQnZGLElBQUksQ0FBQzRCLFNBQUwsR0FBaUIsSUFBakI7TUFDQW1ELFdBQVcsQ0FBQ00sS0FBWixDQUFrQkcsY0FBbEIsR0FBbUMsY0FBbkM7TUFDQWxGLE9BQU8sQ0FBQ0MsR0FBUixDQUFZbUMsY0FBWjtNQUNBbEQsWUFBWSxDQUFDb0IsT0FBYixDQUFxQixNQUFyQixFQUE2QmxCLElBQUksQ0FBQ21CLFNBQUwsQ0FBZTZCLGNBQWYsQ0FBN0I7SUFDRCxDQUxELE1BS087TUFDTDFDLElBQUksQ0FBQzRCLFNBQUwsR0FBaUIsS0FBakI7TUFDQW1ELFdBQVcsQ0FBQ00sS0FBWixDQUFrQkcsY0FBbEIsR0FBbUMsTUFBbkM7TUFDQWhHLFlBQVksQ0FBQ29CLE9BQWIsQ0FBcUIsTUFBckIsRUFBNkJsQixJQUFJLENBQUNtQixTQUFMLENBQWU2QixjQUFmLENBQTdCO0lBQ0Q7RUFDRixDQVhEO0VBWUF4RCxLQUFLLENBQUNlLE1BQU4sQ0FBYThFLFdBQWI7QUFDRDtBQUVNLFNBQVN2RyxVQUFULENBQW9CZSxjQUFwQixFQUFvQ0wsS0FBcEMsRUFBMkN3RCxjQUEzQyxFQUEyRDtFQUNoRSxJQUFJbEIsT0FBTyxHQUFHM0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWQ7RUFDQTBDLE9BQU8sQ0FBQzFCLFNBQVIsR0FBb0IsVUFBcEI7RUFDQTBCLE9BQU8sQ0FBQ3BDLFNBQVIsR0FBb0IsY0FBcEI7RUFDQW9DLE9BQU8sQ0FBQ3RCLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLE1BQU07SUFDdENoQixLQUFLLENBQUM4RCxXQUFOLENBQWtCeEIsT0FBbEI7SUFDQSxJQUFJaUUsbUJBQW1CLEdBQUc1RyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBMUI7SUFDQSxJQUFJNEcsY0FBYyxHQUFHN0csUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQXJCO0lBQ0EsSUFBSTZHLGNBQWMsR0FBRzlHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFyQjtJQUNBLElBQUk4RyxvQkFBb0IsR0FBRy9HLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUEzQjtJQUNBLElBQUkrRyxvQkFBb0IsR0FBR2hILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUEzQjtJQUNBLElBQUlnSCxhQUFhLEdBQUdqSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBcEI7SUFDQSxJQUFJaUgsVUFBVSxHQUFHbEgsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWpCO0lBQ0EsSUFBSWlHLFdBQVcsR0FBR2xHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUF2QixDQUFsQjtJQUNBLElBQUlrRyxTQUFTLEdBQUduRyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7SUFDQSxJQUFJbUcsUUFBUSxHQUFHcEcsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWY7SUFFQTRHLGNBQWMsQ0FBQ3RHLFNBQWYsR0FBMkIsT0FBM0I7SUFDQXNHLGNBQWMsQ0FBQ1AsWUFBZixDQUE0QixLQUE1QixFQUFtQyxrQkFBbkM7SUFDQVMsb0JBQW9CLENBQUN4RyxTQUFyQixHQUFpQyxhQUFqQztJQUNBd0csb0JBQW9CLENBQUNULFlBQXJCLENBQWtDLEtBQWxDLEVBQXlDLHdCQUF6QztJQUNBUyxvQkFBb0IsQ0FBQ0ksR0FBckIsR0FBMkIsd0JBQTNCO0lBQ0FQLG1CQUFtQixDQUFDM0YsU0FBcEIsR0FBZ0Msa0JBQWhDO0lBQ0E2RixjQUFjLENBQUM1RixFQUFmLEdBQW9CLGtCQUFwQjtJQUNBOEYsb0JBQW9CLENBQUM5RixFQUFyQixHQUEwQix3QkFBMUI7SUFDQThGLG9CQUFvQixDQUFDVixZQUFyQixDQUFrQyxRQUFsQyxFQUE0QyxFQUE1QztJQUNBVSxvQkFBb0IsQ0FBQ1YsWUFBckIsQ0FBa0MsS0FBbEMsRUFBeUMsQ0FBekM7SUFDQVksVUFBVSxDQUFDM0csU0FBWCxHQUF1QixRQUF2QjtJQUNBMkcsVUFBVSxDQUFDaEcsRUFBWCxHQUFnQixRQUFoQjtJQUNBK0YsYUFBYSxDQUFDWCxZQUFkLENBQTJCLE1BQTNCLEVBQW1DLE1BQW5DO0lBRUFZLFVBQVUsQ0FBQzdGLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLE1BQU07TUFDekMsSUFBSXlGLGNBQWMsQ0FBQ3hDLEtBQWYsSUFBd0IsRUFBNUIsRUFBZ0M7UUFDOUIsSUFBSThDLFlBQVksR0FBR04sY0FBYyxDQUFDeEMsS0FBbEM7UUFDQSxJQUFJK0Msa0JBQWtCLEdBQUdMLG9CQUFvQixDQUFDMUMsS0FBOUM7UUFDQSxJQUFJZ0QsV0FBVyxHQUFHTCxhQUFhLENBQUMzQyxLQUFoQzs7UUFDQSxJQUFJMEMsb0JBQW9CLENBQUMxQyxLQUFyQixJQUE4QixFQUFsQyxFQUFzQztVQUNwQytDLGtCQUFrQixHQUFHLE9BQXJCO1FBQ0Q7O1FBQ0QsSUFBSUUsT0FBTyxHQUFHcEcsK0NBQUksQ0FBQ2lHLFlBQUQsRUFBZUMsa0JBQWYsRUFBbUNDLFdBQW5DLEVBQWdELEtBQWhELENBQWxCO1FBQ0E1RyxjQUFjLENBQUNMLEtBQWYsQ0FBcUJvQyxJQUFyQixDQUEwQjhFLE9BQTFCO1FBQ0E1RyxZQUFZLENBQUNvQixPQUFiLENBQXFCLE1BQXJCLEVBQTZCbEIsSUFBSSxDQUFDbUIsU0FBTCxDQUFlNkIsY0FBZixDQUE3QjtRQUNBc0MsU0FBUyxDQUFDNUYsU0FBVixHQUFzQmdILE9BQU8sQ0FBQzdFLEtBQTlCO1FBQ0F3RCxXQUFXLENBQUM5RSxNQUFaLENBQW1CZ0YsUUFBbkIsRUFBNkJELFNBQTdCLEVBWDhCLENBWTlCOztRQUNBOUYsS0FBSyxDQUFDOEQsV0FBTixDQUFrQnlDLG1CQUFsQjtRQUNBdkcsS0FBSyxDQUFDOEQsV0FBTixDQUFrQitDLFVBQWxCO1FBQ0FySCxXQUFXLENBQUMwSCxPQUFELEVBQVVsSCxLQUFWLEVBQWlCd0QsY0FBakIsQ0FBWDtRQUVBakUsUUFBUSxDQUFDUyxLQUFLLENBQUMyRixTQUFQLEVBQWtCM0YsS0FBbEIsRUFBeUJ3RCxjQUF6QixFQUF5Q25ELGNBQXpDLENBQVI7UUFDQUwsS0FBSyxDQUFDbUUsV0FBTixDQUFrQjdCLE9BQWxCO01BQ0QsQ0FuQkQsTUFtQk87UUFDTHRDLEtBQUssQ0FBQzhELFdBQU4sQ0FBa0J5QyxtQkFBbEI7UUFDQXZHLEtBQUssQ0FBQzhELFdBQU4sQ0FBa0IrQyxVQUFsQjtRQUNBN0csS0FBSyxDQUFDbUUsV0FBTixDQUFrQjdCLE9BQWxCO01BQ0Q7SUFDRixDQXpCRDtJQTJCQWlFLG1CQUFtQixDQUFDeEYsTUFBcEIsQ0FBMkJ5RixjQUEzQixFQUEyQ0MsY0FBM0MsRUFBMkRDLG9CQUEzRCxFQUFpRkMsb0JBQWpGLEVBQXVHQyxhQUF2RztJQUNBNUcsS0FBSyxDQUFDZSxNQUFOLENBQWF3RixtQkFBYjtJQUNBdkcsS0FBSyxDQUFDZSxNQUFOLENBQWE4RixVQUFiO0lBRUFKLGNBQWMsQ0FBQ3pGLGdCQUFmLENBQWdDLFVBQWhDLEVBQTRDLFVBQVNvRCxLQUFULEVBQWdCO01BQzFELElBQUlBLEtBQUssQ0FBQ0MsR0FBTixJQUFhLE9BQWpCLEVBQTBCO1FBQ3hCRCxLQUFLLENBQUNFLGNBQU47UUFDQTNFLFFBQVEsQ0FBQzRFLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLEtBQWxDO01BQ0Q7SUFDRixDQUxEO0lBTUFtQyxvQkFBb0IsQ0FBQzNGLGdCQUFyQixDQUFzQyxVQUF0QyxFQUFrRCxVQUFTb0QsS0FBVCxFQUFnQjtNQUNoRSxJQUFJQSxLQUFLLENBQUNDLEdBQU4sSUFBYSxPQUFqQixFQUEwQjtRQUN4QkQsS0FBSyxDQUFDRSxjQUFOO1FBQ0EzRSxRQUFRLENBQUM0RSxjQUFULENBQXdCLFFBQXhCLEVBQWtDQyxLQUFsQztNQUNEO0lBQ0YsQ0FMRDtFQU1ELENBdEVEO0VBdUVBLE9BQU9sQyxPQUFQO0FBQ0Q7QUFFTSxTQUFTL0MsUUFBVCxDQUFrQnFDLE9BQWxCLEVBQTJCNUIsS0FBM0IsRUFBa0N3RCxjQUFsQyxFQUFrRG5ELGNBQWxELEVBQWtFO0VBQ3ZFLElBQUk4RSxLQUFLLEdBQUdSLEtBQUssQ0FBQ0MsSUFBTixDQUFXNUUsS0FBSyxDQUFDNkUsUUFBakIsQ0FBWixDQUR1RSxDQUV2RTs7RUFFQWpELE9BQU8sQ0FBQ1osZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MsVUFBUzJDLENBQVQsRUFBWTtJQUM1QyxJQUFJbUIsTUFBTSxHQUFHbkIsQ0FBQyxDQUFDbUIsTUFBZjs7SUFDQSxJQUFJQSxNQUFNLENBQUNDLE9BQVAsSUFBa0IsS0FBdEIsRUFBNkI7TUFDM0JELE1BQU0sR0FBR25CLENBQUMsQ0FBQ21CLE1BQUYsQ0FBU1UsYUFBbEI7SUFDRCxDQUoyQyxDQUs1Qzs7O0lBQ0EsSUFBSVYsTUFBTSxLQUFLLElBQWYsRUFBcUI7TUFDbkI7SUFDRDs7SUFDRGxELE9BQU8sQ0FBQ3VFLEtBQVIsQ0FBY2dCLE9BQWQsR0FBd0IsTUFBeEI7SUFDQSxJQUFJbEMsS0FBSyxHQUFHRSxLQUFLLENBQUNELE9BQU4sQ0FBY0osTUFBZCxDQUFaO0lBQ0EsSUFBSXpDLEtBQUssR0FBRzFDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFaO0lBQ0EsSUFBSXdILGFBQWEsR0FBR3pILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFwQjtJQUNBLElBQUkyQyxXQUFXLEdBQUc1QyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBbEI7SUFDQSxJQUFJNEMsT0FBTyxHQUFHN0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQWQ7SUFDQSxJQUFJMEYsVUFBVSxHQUFHM0YsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWpCO0lBQ0EsSUFBSXlILFlBQVksR0FBRzFILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFuQjtJQUNBLElBQUl5RixnQkFBZ0IsR0FBRzFGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUF2QjtJQUNBeUYsZ0JBQWdCLENBQUN4RSxFQUFqQixHQUFzQixjQUF0QjtJQUNBeUUsVUFBVSxDQUFDekUsRUFBWCxHQUFnQixrQkFBaEI7SUFDQXdHLFlBQVksQ0FBQ3hHLEVBQWIsR0FBa0Isb0JBQWxCO0lBQ0EyQixPQUFPLENBQUMzQixFQUFSLEdBQWEsVUFBYjtJQUNBMEIsV0FBVyxDQUFDMEQsWUFBWixDQUF5QixRQUF6QixFQUFtQyxFQUFuQztJQUNBMUQsV0FBVyxDQUFDMEQsWUFBWixDQUF5QixLQUF6QixFQUFnQyxDQUFoQztJQUNBMUQsV0FBVyxDQUFDMUIsRUFBWixHQUFpQixrQkFBakI7SUFDQTJCLE9BQU8sQ0FBQ3lELFlBQVIsQ0FBcUIsTUFBckIsRUFBNkIsTUFBN0I7SUFDQXpELE9BQU8sQ0FBQ3lCLEtBQVIsR0FBZ0I1RCxjQUFjLENBQUNMLEtBQWYsQ0FBcUJpRixLQUFyQixFQUE0QnpDLE9BQTVDO0lBQ0E0RSxhQUFhLENBQUN4RyxTQUFkLEdBQTBCLGNBQTFCO0lBQ0F5QixLQUFLLENBQUN4QixFQUFOLEdBQVcsWUFBWDtJQUNBd0IsS0FBSyxDQUFDNEQsWUFBTixDQUFtQixRQUFuQixFQUE2QixFQUE3QjtJQUNBNUQsS0FBSyxDQUFDNEQsWUFBTixDQUFtQixLQUFuQixFQUEwQixDQUExQjtJQUNBNUQsS0FBSyxDQUFDNEIsS0FBTixHQUFjckMsT0FBTyxDQUFDTixhQUFSLENBQXNCLEtBQXRCLEVBQTZCZ0csU0FBM0M7SUFDQS9FLFdBQVcsQ0FBQzBCLEtBQVosR0FBb0I1RCxjQUFjLENBQUNMLEtBQWYsQ0FBcUJpRixLQUFyQixFQUE0QjFDLFdBQWhEO0lBRUFGLEtBQUssQ0FBQ3JCLGdCQUFOLENBQXVCLFVBQXZCLEVBQW1DLFVBQVMyQyxDQUFULEVBQVk7TUFDN0MsSUFBSUEsQ0FBQyxDQUFDVSxHQUFGLElBQVMsT0FBYixFQUFzQjtRQUNwQlYsQ0FBQyxDQUFDVyxjQUFGO1FBQ0FnQixVQUFVLENBQUNkLEtBQVg7TUFDRDtJQUNGLENBTEQ7SUFPQWEsZ0JBQWdCLENBQUN0RSxNQUFqQixDQUF3QnNHLFlBQXhCLEVBQXNDL0IsVUFBdEM7SUFDQThCLGFBQWEsQ0FBQ3JHLE1BQWQsQ0FBcUJzQixLQUFyQixFQUE0QkUsV0FBNUIsRUFBeUNDLE9BQXpDLEVBQWtENkMsZ0JBQWxEO0lBQ0FnQyxZQUFZLENBQUNDLFNBQWIsR0FBeUIsYUFBekIsQ0EzQzRDLENBNkM1Qzs7SUFDQUQsWUFBWSxDQUFDckcsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsTUFBTTtNQUMzQ1gsY0FBYyxDQUFDTCxLQUFmLENBQXFCeUYsTUFBckIsQ0FBNEJSLEtBQTVCLEVBQW1DLENBQW5DO01BQ0FqRixLQUFLLENBQUM4RCxXQUFOLENBQWtCc0QsYUFBbEI7TUFDQXBILEtBQUssQ0FBQzhELFdBQU4sQ0FBa0JsQyxPQUFsQjtNQUNBdEIsWUFBWSxDQUFDb0IsT0FBYixDQUFxQixNQUFyQixFQUE2QmxCLElBQUksQ0FBQ21CLFNBQUwsQ0FBZTZCLGNBQWYsQ0FBN0I7TUFDQSxJQUFJa0MsQ0FBQyxHQUFHLENBQVI7TUFFQTFGLEtBQUssQ0FBQzhELFdBQU4sQ0FBa0I5RCxLQUFLLENBQUMyRixTQUF4Qjs7TUFDQSxLQUFLLE1BQU0vRCxPQUFYLElBQXNCNUIsS0FBSyxDQUFDNkIsZ0JBQU4sQ0FBdUIsSUFBdkIsQ0FBdEIsRUFBb0Q7UUFDbEQ3QixLQUFLLENBQUM4RCxXQUFOLENBQWtCbEMsT0FBbEI7UUFDQXBDLFdBQVcsQ0FBQ2EsY0FBYyxDQUFDTCxLQUFmLENBQXFCMEYsQ0FBckIsQ0FBRCxFQUEwQjFGLEtBQTFCLEVBQWlDd0QsY0FBakMsQ0FBWDtRQUNBa0MsQ0FBQztNQUNGOztNQUNELEtBQUssTUFBTTlELE9BQVgsSUFBc0I1QixLQUFLLENBQUM2QixnQkFBTixDQUF1QixJQUF2QixDQUF0QixFQUFvRDtRQUNsRHRDLFFBQVEsQ0FBQ3FDLE9BQUQsRUFBVTVCLEtBQVYsRUFBaUJ3RCxjQUFqQixFQUFpQ25ELGNBQWpDLENBQVI7TUFDRDs7TUFDREwsS0FBSyxDQUFDbUUsV0FBTixDQUFrQjdFLFVBQVUsQ0FBQ2UsY0FBRCxFQUFpQkwsS0FBakIsRUFBd0J3RCxjQUF4QixDQUE1QjtJQUNELENBakJEO0lBbUJBOEIsVUFBVSxDQUFDZ0MsU0FBWCxHQUF1QixNQUF2QjtJQUNBaEMsVUFBVSxDQUFDdEUsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsTUFBTTtNQUN6QztNQUNBLElBQUlxQixLQUFLLENBQUM0QixLQUFOLElBQWUsRUFBbkIsRUFBdUI7UUFDckJqRSxLQUFLLENBQUM4RCxXQUFOLENBQWtCc0QsYUFBbEI7UUFDQXhGLE9BQU8sQ0FBQ3VFLEtBQVIsQ0FBY2dCLE9BQWQsR0FBd0IsTUFBeEI7UUFDQTlHLGNBQWMsQ0FBQ0wsS0FBZixDQUFxQmlGLEtBQXJCLEVBQTRCMUMsV0FBNUIsR0FBMENBLFdBQVcsQ0FBQzBCLEtBQXREO1FBQ0EzRCxZQUFZLENBQUNvQixPQUFiLENBQXFCLE1BQXJCLEVBQTZCbEIsSUFBSSxDQUFDbUIsU0FBTCxDQUFlNkIsY0FBZixDQUE3QjtRQUNBO01BQ0Q7O01BQ0RuRCxjQUFjLENBQUNMLEtBQWYsQ0FBcUJpRixLQUFyQixFQUE0QjVDLEtBQTVCLEdBQW9DQSxLQUFLLENBQUM0QixLQUExQztNQUNBNUQsY0FBYyxDQUFDTCxLQUFmLENBQXFCaUYsS0FBckIsRUFBNEIxQyxXQUE1QixHQUEwQ0EsV0FBVyxDQUFDMEIsS0FBdEQ7TUFDQTVELGNBQWMsQ0FBQ0wsS0FBZixDQUFxQmlGLEtBQXJCLEVBQTRCekMsT0FBNUIsR0FBc0NBLE9BQU8sQ0FBQ3lCLEtBQTlDO01BQ0EzRCxZQUFZLENBQUNvQixPQUFiLENBQXFCLE1BQXJCLEVBQTZCbEIsSUFBSSxDQUFDbUIsU0FBTCxDQUFlNkIsY0FBZixDQUE3QjtNQUNBeEQsS0FBSyxDQUFDOEQsV0FBTixDQUFrQnNELGFBQWxCO01BQ0F4RixPQUFPLENBQUNDLGdCQUFSLENBQXlCLEtBQXpCLEVBQWdDLENBQWhDLEVBQW1DeUYsU0FBbkMsR0FBK0NqRixLQUFLLENBQUM0QixLQUFyRDtNQUNBckMsT0FBTyxDQUFDQyxnQkFBUixDQUF5QixLQUF6QixFQUFnQyxDQUFoQyxFQUFtQ3lGLFNBQW5DLEdBQStDOUUsT0FBTyxDQUFDeUIsS0FBdkQ7TUFFQXJDLE9BQU8sQ0FBQ3VFLEtBQVIsQ0FBY2dCLE9BQWQsR0FBd0IsTUFBeEI7SUFDRCxDQWxCRDtJQW1CQW5ILEtBQUssQ0FBQ3VILFlBQU4sQ0FBbUJILGFBQW5CLEVBQWtDcEgsS0FBSyxDQUFDNkUsUUFBTixDQUFlSSxLQUFmLENBQWxDO0VBQ0QsQ0F0RkQ7QUF1RkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JORDtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLG9IQUFvSDtBQUNwSDtBQUNBLGlEQUFpRCx3QkFBd0Isd0JBQXdCLDBCQUEwQiwyQkFBMkIsK0NBQStDLCtCQUErQixnQ0FBZ0Msc0NBQXNDLDZCQUE2QixpQ0FBaUMsd0JBQXdCLEdBQUcsaUJBQWlCLHdCQUF3Qix3QkFBd0IsMEJBQTBCLDJCQUEyQiwrQ0FBK0MsK0JBQStCLGdDQUFnQyxzQ0FBc0MsNkJBQTZCLGlDQUFpQyx3QkFBd0IsR0FBRyxnQkFBZ0Isd0JBQXdCLHdCQUF3QiwwQkFBMEIsMkJBQTJCLCtDQUErQywrQkFBK0IsZ0NBQWdDLHNDQUFzQywrQkFBK0IsaUNBQWlDLHVCQUF1QixHQUFHLGtEQUFrRCxrQ0FBa0MsMkJBQTJCLDJDQUEyQyxvQkFBb0IsdUJBQXVCLG9CQUFvQixHQUFHLDhEQUE4RCw4Q0FBOEMsR0FBRyxVQUFVLGNBQWMsMEJBQTBCLHVCQUF1QixHQUFHLGdCQUFnQixrQkFBa0IsZ0RBQWdELGtCQUFrQixpQkFBaUIsR0FBRyxRQUFRLHFCQUFxQixHQUFHLFFBQVEsZUFBZSxHQUFHLHlCQUF5Qix5REFBeUQscUJBQXFCLG9CQUFvQix5Q0FBeUMsMkJBQTJCLGtCQUFrQixHQUFHLDRCQUE0QixvQkFBb0IsOEJBQThCLEdBQUcsd0JBQXdCLG9CQUFvQixHQUFHLCtCQUErQixrREFBa0QsdUJBQXVCLEdBQUcsbUJBQW1CLGtCQUFrQiwyQkFBMkIsR0FBRyxjQUFjLGtCQUFrQixtQ0FBbUMsd0JBQXdCLEdBQUcsNkJBQTZCLG9CQUFvQix1QkFBdUIsMkNBQTJDLG9CQUFvQixLQUFLLDJCQUEyQix1Q0FBdUMsR0FBRyxxQkFBcUIsZ0JBQWdCLGlCQUFpQixHQUFHLHNCQUFzQixtQkFBbUIsa0JBQWtCLDJCQUEyQix3QkFBd0Isc0NBQXNDLDJCQUEyQixtQkFBbUIsc0JBQXNCLEdBQUcsMEJBQTBCLHNCQUFzQixxQkFBcUIsR0FBRyxZQUFZLGVBQWUscUJBQXFCLEdBQUcsa0JBQWtCLHlDQUF5QyxHQUFHLG1CQUFtQixvQkFBb0IsMEJBQTBCLGtEQUFrRCxrQkFBa0IsMkJBQTJCLEdBQUcsb0NBQW9DLDBCQUEwQix5Q0FBeUMsdUJBQXVCLGtCQUFrQixpQkFBaUIsaUJBQWlCLEdBQUcsbUJBQW1CLHFCQUFxQixHQUFHLDBCQUEwQix1QkFBdUIsR0FBRyxpQkFBaUIsb0JBQW9CLDJDQUEyQywyQkFBMkIsaUJBQWlCLHFCQUFxQixHQUFHLDZDQUE2Qyx1Q0FBdUMsR0FBRyx1QkFBdUIsb0JBQW9CLDJDQUEyQywyQkFBMkIsaUJBQWlCLEdBQUcsZ0RBQWdELGtCQUFrQixHQUFHLGVBQWUsa0JBQWtCLHdCQUF3QixjQUFjLG9DQUFvQyxrREFBa0QsR0FBRyxxQkFBcUIsK0JBQStCLG9CQUFvQixHQUFHLGVBQWUsa0JBQWtCLG1CQUFtQixHQUFHLGVBQWUscUJBQXFCLHNCQUFzQixHQUFHLHVCQUF1QixrQkFBa0IsMkJBQTJCLEdBQUcsdUJBQXVCLGlCQUFpQixHQUFHLDZCQUE2QixpQkFBaUIsaUJBQWlCLEdBQUcsU0FBUyxnRkFBZ0YsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVB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QUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9kYXNoYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvdG9kb3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvZG8tYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRGVtbyB9IGZyb20gJy4vbG9naWMuanMnO1xuaW1wb3J0IHsgYWRkTmV3UHJvamVjdCwgZGlzcGxheVByb2plY3QsIHN3aXRjaFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IGFkZE5ld1RvZG8sIG9wZW5Ub2RvLCBkaXNwbGF5VG9kbyB9IGZyb20gJy4vdG9kb3MuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGFzaGJvYXJkKCkge1xuICBsZXQgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IHNpZGViYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBsZXQgdG9kb3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IHRvZG9zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbGV0IHRoZW1lVG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHRoZW1lVG9nZ2xlLmlubmVySFRNTCA9ICdUb2dnbGUgVGhlbWUnO1xuXG4gIGxldCB7IGRlbW9BY2NvdW50LCBpbmJveCB9ID0gY3JlYXRlRGVtbygpO1xuICBsZXQgY3VycmVudFByb2plY3QgPSBpbmJveDtcblxuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKSAhPT0gbnVsbCkge1xuICAgIGRlbW9BY2NvdW50ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpKTtcbiAgICBjdXJyZW50UHJvamVjdCA9IGRlbW9BY2NvdW50LnByb2plY3RzWzBdO1xuICB9XG5cbiAgbGV0IGFkZFByb2plY3QgPSBhZGROZXdQcm9qZWN0KHNpZGViYXIsIGRlbW9BY2NvdW50LCB0b2Rvcyk7XG4gIHByb2plY3RzQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdwcm9qZWN0cy1jb250YWluZXInO1xuICBzaWRlYmFyLmNsYXNzTmFtZSA9ICdwcm9qZWN0cyc7XG4gIHRvZG9zQ29udGFpbmVyLmlkID0gJ3RvZG9zLWNvbnRhaW5lcic7XG4gIHRvZG9zLmlkID0gJ3RvZG9zJztcblxuICBmb3IgKGNvbnN0IHRvZG8gb2YgY3VycmVudFByb2plY3QudG9kb3MpIHtcbiAgICBkaXNwbGF5VG9kbyh0b2RvLCB0b2RvcywgZGVtb0FjY291bnQsIGN1cnJlbnRQcm9qZWN0KTtcbiAgfVxuICB0b2Rvcy5hcHBlbmQoYWRkTmV3VG9kbyhjdXJyZW50UHJvamVjdCwgdG9kb3MsIGRlbW9BY2NvdW50KSk7XG5cbiAgdGhlbWVUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBjb25zdCBuZXdUaGVtZSA9IHJvb3QuY2xhc3NOYW1lID09PSAnZGFyaycgPyAnbGlnaHQnIDogJ2RhcmsnO1xuICAgIHJvb3QuY2xhc3NOYW1lID0gbmV3VGhlbWU7XG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLnNldEF0dHJpYnV0ZSgnY29sb3Itc2NoZW1lJywgJ2xpZ2h0Jyk7XG4gICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpKTtcbiAgfSlcblxuICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmQodGhlbWVUb2dnbGUpO1xuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgZGVtb0FjY291bnQucHJvamVjdHMpIHtcbiAgICBzaWRlYmFyLmFwcGVuZChkaXNwbGF5UHJvamVjdChwcm9qZWN0LCBzaWRlYmFyLCBkZW1vQWNjb3VudCwgdG9kb3MpKTtcbiAgfVxuICBzaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJ2xpJykuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtcHJvamVjdCcpO1xuXG4gIHNpZGViYXIuYXBwZW5kKGFkZFByb2plY3QpO1xuICB0b2Rvc0NvbnRhaW5lci5hcHBlbmQodG9kb3MpO1xuICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmQoc2lkZWJhcik7XG4gIGNvbnRlbnQuY2xhc3NOYW1lID0gJ2Rhc2hib2FyZCc7XG4gIGNvbnRlbnQuYXBwZW5kKHByb2plY3RzQ29udGFpbmVyKTtcbiAgY29udGVudC5hcHBlbmQodG9kb3NDb250YWluZXIpO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGRlbW9BY2NvdW50KSk7XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRvZG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICBvcGVuVG9kbyhlbGVtZW50LCB0b2RvcywgZGVtb0FjY291bnQsIGN1cnJlbnRQcm9qZWN0KTtcbiAgfVxuXG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBzaWRlYmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICBzd2l0Y2hQcm9qZWN0KGVsZW1lbnQsIHNpZGViYXIsIHRvZG9zLCBkZW1vQWNjb3VudCk7XG4gIH1cblxuICBsZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb2plY3RUaXRsZS5pZCA9ICdpbm5lci1wcm9qZWN0LXRpdGxlJztcbiAgcHJvamVjdFRpdGxlLmlubmVySFRNTCA9IHNpZGViYXIuZmlyc3RDaGlsZC5maXJzdENoaWxkLmlubmVySFRNTDtcbiAgdG9kb3MuYmVmb3JlKHByb2plY3RUaXRsZSk7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG4iLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IGRhc2hib2FyZCB9IGZyb20gJy4vZGFzaGJvYXJkLmpzJztcblxuZG9jdW1lbnQuYm9keS5hcHBlbmQoZGFzaGJvYXJkKCkpO1xuXG4iLCJleHBvcnQgZnVuY3Rpb24gYWNjb3VudChuYW1lKSB7XG4gIGxldCBwcm9qZWN0cyA9IFtdO1xuICBmdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICB9XG4gIHJldHVybiB7IGFkZFByb2plY3QsIHByb2plY3RzLCBuYW1lIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2plY3QodGl0bGUpIHtcbiAgbGV0IHRvZG9zID0gW107XG4gIGZ1bmN0aW9uIGFkZFRvZG8odG9kbykge1xuICAgIHRvZG9zLnB1c2godG9kbyk7XG4gIH1cbiAgcmV0dXJuIHsgYWNjb3VudCwgYWRkVG9kbywgdG9kb3MsIHRpdGxlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2RvKHRpdGxlID0gJ1RvZG8gVGl0bGUnLCBkZXNjcmlwdGlvbiA9ICdUb2RvIERlc2NyaXB0aW9uJywgZHVlRGF0ZSA9IG5ldyBEYXRlKCksIGNvbXBsZXRlZCA9IGZhbHNlKSB7XG4gIGlmICh0eXBlb2YgZHVlRGF0ZSA9PSAnb2JqZWN0Jykge1xuICAgIGR1ZURhdGUgPSBbXG4gICAgICBkdWVEYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAoZHVlRGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSxcbiAgICAgIChkdWVEYXRlLmdldERhdGUoKSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpLFxuICAgIF0uam9pbignLScpO1xuICB9XG4gIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgY29tcGxldGVkIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZW1vKCkge1xuICBjb25zdCBkZW1vQWNjb3VudCA9IGFjY291bnQoJ0RlbW9tYW4nKTtcbiAgY29uc3QgaW5ib3ggPSBwcm9qZWN0KCdJbmJveCcpO1xuICBjb25zdCB3ZWJzaXRlID0gcHJvamVjdCgnTXkgd2Vic2l0ZSBwcm9qZWN0Jyk7XG4gIGNvbnN0IG15VG9kbyA9IHRvZG8oJ0V4YW1wbGUgVG9kbycsICdIZXJlIGlzIGFuIGV4YW1wbGUgZGVzY3JpcHRpb24nLCBuZXcgRGF0ZSgpLCBmYWxzZSk7XG4gIGNvbnN0IGNvbXBsZXRlZFRvZG8gPSB0b2RvKCdDb21wbGV0ZWQgVG9kbycsICdIZXJlIGlzIGFuIGV4YW1wbGUgb2YgYSBjb21wbGV0ZWQgdG9kbycsIG5ldyBEYXRlKCksIHRydWUpO1xuICBjb25zdCBoYWxmRmlsbGVkVG9kbyA9IHRvZG8oJ0hhbGYgVG9kbycsICdEZXNjcmlwdGlvbiBhbmQgbm8gZGF0ZSBvciBjb21wbGV0ZWQgdmFsdWUnLCBuZXcgRGF0ZSgpLCBmYWxzZSk7XG4gIGNvbnN0IG15VG9kbzEgPSB0b2RvKCk7XG4gIGNvbnN0IHdlYnNpdGVUb2RvID0gdG9kbygnQWRkIGRpdnMnLCAnQWRkIHN0YXJ0aW5nIGRpdnMgdG8gbXkgd2Vic2l0ZScsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgY29uc3Qgd2Vic2l0ZVRvZG8xID0gdG9kbygnU3R5bGUgZGl2cycsICdTdHlsZSBteSBkaXZzIHRvIG1ha2UgdGhlbSBsb29rIG5pY2UuJywgbmV3IERhdGUoKSwgZmFsc2UpO1xuICBcbiAgZGVtb0FjY291bnQuYWRkUHJvamVjdChpbmJveCk7XG4gIGRlbW9BY2NvdW50LmFkZFByb2plY3Qod2Vic2l0ZSk7XG4gIGluYm94LmFkZFRvZG8oY29tcGxldGVkVG9kbyk7XG4gIGluYm94LmFkZFRvZG8obXlUb2RvKTtcbiAgaW5ib3guYWRkVG9kbyhteVRvZG8xKTtcbiAgaW5ib3guYWRkVG9kbyhoYWxmRmlsbGVkVG9kbyk7XG4gIHdlYnNpdGUuYWRkVG9kbyh3ZWJzaXRlVG9kbyk7XG4gIHdlYnNpdGUuYWRkVG9kbyh3ZWJzaXRlVG9kbzEpO1xuICByZXR1cm4geyBkZW1vQWNjb3VudCwgaW5ib3ggfVxufVxuIiwiaW1wb3J0IHtkaXNwbGF5VG9kbywgYWRkTmV3VG9kbywgb3BlblRvZG99IGZyb20gJy4vdG9kb3MuanMnO1xuaW1wb3J0IHtwcm9qZWN0fSBmcm9tICcuL2xvZ2ljLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHByb2plY3QsIHNpZGViYXIsIGN1cnJlbnRBY2NvdW50LCB0b2Rvcykge1xuICBsZXQgcHJvamVjdERpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBsZXQgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgcHJvamVjdFRpdGxlLmlkID0gJ3Byb2plY3QtbmFtZSc7XG4gIHByb2plY3REaXNwbGF5LmNsYXNzTmFtZSA9ICdwcm9qZWN0JztcbiAgcHJvamVjdFRpdGxlLmlubmVySFRNTCA9IHByb2plY3QudGl0bGU7XG5cbiAgbGV0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIG1lbnUuY2xhc3NMaXN0LmFkZCgnZmEtc29saWQnKTtcbiAgbWVudS5jbGFzc0xpc3QuYWRkKCdmYS1lbGxpcHNpcycpO1xuICBtZW51LmNsYXNzTGlzdC5hZGQoJ2ZhLXhsJyk7XG4gIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIHByb2plY3RNZW51KGUsIHByb2plY3REaXNwbGF5LCBwcm9qZWN0VGl0bGUsIG1lbnUsIFxuICAgICAgICAgICAgICAgIHNpZGViYXIsIHByb2plY3QsIGN1cnJlbnRBY2NvdW50LCB0b2Rvcyk7XG4gIH0pO1xuICBwcm9qZWN0RGlzcGxheS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgaWYgKCFwcm9qZWN0RGlzcGxheS5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbWVudScpKVxuICAgICAgcHJvamVjdERpc3BsYXkuYXBwZW5kKG1lbnUpO1xuICB9KTtcbiAgcHJvamVjdERpc3BsYXkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgaWYgKCFwcm9qZWN0RGlzcGxheS5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtbWVudScpKVxuICAgIHByb2plY3REaXNwbGF5LnJlbW92ZUNoaWxkKG1lbnUpXG4gIH0pO1xuICBwcm9qZWN0RGlzcGxheS5hcHBlbmQocHJvamVjdFRpdGxlKTtcbiAgcmV0dXJuIHByb2plY3REaXNwbGF5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3UHJvamVjdChwcm9qZWN0cywgY3VycmVudEFjY291bnQsIHRvZG9zKSB7XG4gIGxldCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGFkZFByb2plY3QuaW5uZXJIVE1MID0gJ0FkZCBuZXcgcHJvamVjdCc7XG4gIGFkZFByb2plY3QuaWQgPSAnYWRkLXByb2plY3QtYnV0dG9uJztcbiAgYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChhZGRQcm9qZWN0KTtcbiAgICBsZXQgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsZXQgcHJvamVjdFN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByb2plY3RTdWJtaXQuaW5uZXJIVE1MID0gJ1N1Ym1pdCc7XG4gICAgcHJvamVjdFN1Ym1pdC5pZCA9ICdzdWJtaXQnO1xuICAgIHByb2plY3RTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAocHJvamVjdElucHV0LnZhbHVlICE9ICcnKSB7XG4gICAgICAgIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdChwcm9qZWN0SW5wdXQudmFsdWUpO1xuICAgICAgICBjdXJyZW50QWNjb3VudC5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgICAgIGxldCBwcm9qZWN0RGlzcGxheSA9IGRpc3BsYXlQcm9qZWN0KG5ld1Byb2plY3QsIHByb2plY3RzLCBjdXJyZW50QWNjb3VudCwgdG9kb3MpO1xuICAgICAgICBwcm9qZWN0cy5hcHBlbmQocHJvamVjdERpc3BsYXksIGFkZFByb2plY3QpO1xuICAgICAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChwcm9qZWN0SW5wdXQpO1xuICAgICAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChwcm9qZWN0U3VibWl0KTtcblxuICAgICAgICBzd2l0Y2hQcm9qZWN0KHByb2plY3REaXNwbGF5LCBwcm9qZWN0cywgdG9kb3MsIGN1cnJlbnRBY2NvdW50KTtcbiAgICAgIH1cbiAgICAgIHByb2plY3RzLnJlbW92ZUNoaWxkKHByb2plY3RJbnB1dCk7XG4gICAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChwcm9qZWN0U3VibWl0KTtcbiAgICAgIHByb2plY3RzLmFwcGVuZENoaWxkKGFkZFByb2plY3QpO1xuICAgIH0pO1xuICAgIHByb2plY3RzLmFwcGVuZChwcm9qZWN0SW5wdXQpO1xuICAgIHByb2plY3RzLmFwcGVuZChwcm9qZWN0U3VibWl0KTtcbiAgICBwcm9qZWN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PSAnRW50ZXInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKS5jbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFkZFByb2plY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hQcm9qZWN0KHByb2plY3RFbGVtZW50LCBwcm9qZWN0cywgdG9kb3MsIGN1cnJlbnRBY2NvdW50KSB7XG4gIC8vIENsaWNrIG9uIHByb2plY3RzIHRvIHN3aXRjaCBjdXJyZW50UHJvamVjdFxuICB2YXIgcHJvamVjdE5vZGVzID0gQXJyYXkuZnJvbShwcm9qZWN0cy5jaGlsZHJlbik7XG4gIHByb2plY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDsgXG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09ICdESVYnKSB7XG4gICAgICB0YXJnZXQgPSBwcm9qZWN0RWxlbWVudDtcbiAgICB9XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09ICdJJykge1xuICAgICAgdGFyZ2V0ID0gcHJvamVjdEVsZW1lbnQ7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgIT09IHRoaXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgcHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZC1wcm9qZWN0Jyk7XG4gICAgfVxuICAgIHByb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLXByb2plY3QnKTtcblxuICAgIGxldCBpbmRleCA9IHByb2plY3ROb2Rlcy5pbmRleE9mKHRhcmdldCk7XG4gICAgd2hpbGUodG9kb3MuZmlyc3RDaGlsZCkge1xuICAgICAgICB0b2Rvcy5yZW1vdmVDaGlsZCh0b2Rvcy5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gY3VycmVudEFjY291bnQucHJvamVjdHNbaW5kZXhdO1xuXG4gICAgLy8gQWRkIHByb2plY3QgdGl0bGUgdG8gdGhlIHRvcCBvZiB0aGUgdG9kbyBsaXN0XG4gICAgbGV0IHRvZG9zQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9zLWNvbnRhaW5lcicpO1xuICAgIGlmICh0b2Rvc0NvbnRhaW5lci5jb250YWlucyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5uZXItcHJvamVjdC10aXRsZScpKSkge1xuICAgICAgdG9kb3NDb250YWluZXIucmVtb3ZlQ2hpbGQodG9kb3NDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGxldCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0VGl0bGUuaWQgPSAnaW5uZXItcHJvamVjdC10aXRsZSc7XG4gICAgaWYgKHByb2plY3RFbGVtZW50LmZpcnN0Q2hpbGQudGFnTmFtZSA9PSAnRElWJylcbiAgICAgIHByb2plY3RUaXRsZS5pbm5lckhUTUwgPSBwcm9qZWN0RWxlbWVudC5maXJzdENoaWxkLmlubmVySFRNTDtcbiAgICBpZiAocHJvamVjdEVsZW1lbnQuZmlyc3RDaGlsZC50YWdOYW1lID09ICdJTlBVVCcpXG4gICAgICBwcm9qZWN0VGl0bGUuaW5uZXJIVE1MID0gcHJvamVjdEVsZW1lbnQuZmlyc3RDaGlsZC52YWx1ZTtcbiAgICB0b2Rvcy5iZWZvcmUocHJvamVjdFRpdGxlKVxuXG4gICAgZm9yIChjb25zdCB0b2RvIG9mIGN1cnJlbnRQcm9qZWN0LnRvZG9zKSB7XG4gICAgICBkaXNwbGF5VG9kbyh0b2RvLCB0b2RvcywgY3VycmVudEFjY291bnQsIGN1cnJlbnRQcm9qZWN0KTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRvZG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgIG9wZW5Ub2RvKGVsZW1lbnQsIHRvZG9zLCBjdXJyZW50QWNjb3VudCwgY3VycmVudFByb2plY3QpO1xuICAgIH1cbiAgICB0b2Rvcy5hcHBlbmQoYWRkTmV3VG9kbyhjdXJyZW50UHJvamVjdCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50KSk7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2plY3RNZW51KGUsIHByb2plY3REaXNwbGF5LCBwcm9qZWN0VGl0bGUsIG1lbnUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdHMsIHByb2plY3QsIGN1cnJlbnRBY2NvdW50LCB0b2Rvcykge1xuICB2YXIgbm9kZXMgPSBBcnJheS5mcm9tKHByb2plY3RzLmNoaWxkcmVuKTtcbiAgbGV0IHByb2plY3RUaXRsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgbGV0IGJ1dHRvbnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGRvbmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBsZXQgaW5kZXggPSBub2Rlcy5pbmRleE9mKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtbWVudScpO1xuICBkZWxldGVCdXR0b24uaWQgPSAnZGVsZXRlLXByb2plY3QnO1xuICBkb25lQnV0dG9uLmlkID0gJ3N1Ym1pdC1wcm9qZWN0JztcbiAgZG9uZUJ1dHRvbi5pbm5lckhUTUwgPSAnRG9uZSc7XG4gIGRlbGV0ZUJ1dHRvbi5pbm5lckhUTUwgPSAnRGVsZXRlJztcbiAgYnV0dG9uc0NvbnRhaW5lci5jbGFzc05hbWUgPSAncHJvamVjdC1idXR0b25zJztcbiAgcHJvamVjdFRpdGxlSW5wdXQudmFsdWUgPSBwcm9qZWN0LnRpdGxlO1xuICBidXR0b25zQ29udGFpbmVyLmFwcGVuZChkZWxldGVCdXR0b24sIGRvbmVCdXR0b24pO1xuICBwcm9qZWN0RGlzcGxheS5yZW1vdmVDaGlsZChwcm9qZWN0VGl0bGUpO1xuICBwcm9qZWN0RGlzcGxheS5yZW1vdmVDaGlsZChtZW51KTtcbiAgcHJvamVjdERpc3BsYXkuYXBwZW5kKHByb2plY3RUaXRsZUlucHV0LCBidXR0b25zQ29udGFpbmVyKTtcblxuICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGN1cnJlbnRBY2NvdW50LnByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdERpc3BsYXkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQocHJvamVjdHMubGFzdENoaWxkKTtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgcHJvamVjdHMucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgcHJvamVjdHMucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICBwcm9qZWN0cy5hcHBlbmQoZGlzcGxheVByb2plY3QoY3VycmVudEFjY291bnQucHJvamVjdHNbaV0sIHByb2plY3RzLCBjdXJyZW50QWNjb3VudCwgdG9kb3MpKTtcbiAgICAgIGkrKztcbiAgICB9XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdmdWNrJyk7XG4gICAgICBzd2l0Y2hQcm9qZWN0KGVsZW1lbnQsIHByb2plY3RzLCB0b2RvcywgY3VycmVudEFjY291bnQpO1xuICAgIH1cbiAgICBwcm9qZWN0cy5hcHBlbmRDaGlsZChhZGROZXdQcm9qZWN0KHByb2plY3RzLCBjdXJyZW50QWNjb3VudCwgdG9kb3MpKTtcbiAgfSk7XG5cbiAgZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAocHJvamVjdFRpdGxlSW5wdXQudmFsdWUgIT0gJycpIHtcbiAgICAgIGN1cnJlbnRBY2NvdW50LnByb2plY3RzW2luZGV4XS50aXRsZSA9IHByb2plY3RUaXRsZUlucHV0LnZhbHVlO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgIH1cbiAgICAgIGxldCByZXN1bHRQcm9qZWN0RGlzcGxheSA9IGRpc3BsYXlQcm9qZWN0KHByb2plY3QsIHByb2plY3RzLCBjdXJyZW50QWNjb3VudCwgdG9kb3MpO1xuICAgICAgaWYgKHByb2plY3REaXNwbGF5LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQtcHJvamVjdCcpKVxuICAgICAgICByZXN1bHRQcm9qZWN0RGlzcGxheS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1wcm9qZWN0Jyk7XG4gICAgICBwcm9qZWN0RGlzcGxheS5iZWZvcmUocmVzdWx0UHJvamVjdERpc3BsYXkpO1xuICAgICAgc3dpdGNoUHJvamVjdChyZXN1bHRQcm9qZWN0RGlzcGxheSwgcHJvamVjdHMsIHRvZG9zLCBjdXJyZW50QWNjb3VudCk7XG4gICAgICBwcm9qZWN0cy5yZW1vdmVDaGlsZChwcm9qZWN0RGlzcGxheSk7XG4gIH0pO1xuXG4gIHByb2plY3RUaXRsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09ICdFbnRlcicpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0LXByb2plY3QnKS5jbGljaygpO1xuICAgIH1cbiAgfSk7IFxuXG59IiwiaW1wb3J0IHsgdG9kbyB9IGZyb20gJy4vbG9naWMuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVRvZG8odG9kbywgdG9kb3MsIGN1cnJlbnRBY2NvdW50KSB7XG4gIGxldCB0b2RvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGxldCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgbGV0IHRvZG9EYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuICBjaGVja2JveC5jbGFzc05hbWUgPSAnY2hlY2tib3gnO1xuICB0b2RvVGl0bGUuaWQgPSAndG9kb2xpc3QtdG9kby10aXRsZSc7XG4gIHRvZG9EYXRlLmlkID0gJ3RvZG8tZGF0ZSc7XG4gIHRvZG9UaXRsZS5pbm5lckhUTUwgPSB0b2RvLnRpdGxlO1xuICB0b2RvRGF0ZS5pbm5lckhUTUwgPSB0b2RvLmR1ZURhdGU7XG5cbiAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgY3VycmVudERhdGUgPSBbY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgKGN1cnJlbnREYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyksXG4gICAgICAgICAgICAgICAgIChjdXJyZW50RGF0ZS5nZXREYXRlKCkpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSxcbiAgICAgICAgICAgICAgICBdLmpvaW4oJy0nKTtcbiAgaWYgKHRvZG8uZHVlRGF0ZSA9PSBjdXJyZW50RGF0ZSkge1xuICAgIHRvZG9EYXRlLnN0eWxlLmNvbG9yID0gJ3ZhcigtLXRvZG8tZGF0ZS1ncmVlbiknO1xuICB9XG4gIHRvZG9EaXNwbGF5LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgdG9kb0Rpc3BsYXkuYXBwZW5kQ2hpbGQodG9kb1RpdGxlKTtcbiAgdG9kb0Rpc3BsYXkuYXBwZW5kQ2hpbGQodG9kb0RhdGUpO1xuICBpZiAodG9kby5jb21wbGV0ZWQpIHtcbiAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICB0b2RvRGlzcGxheS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdsaW5lLXRocm91Z2gnO1xuICB9XG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgIHRvZG8uY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgIHRvZG9EaXNwbGF5LnN0eWxlLnRleHREZWNvcmF0aW9uID0gJ2xpbmUtdGhyb3VnaCc7XG4gICAgICBjb25zb2xlLmxvZyhjdXJyZW50QWNjb3VudCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRBY2NvdW50KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZG8uY29tcGxldGVkID0gZmFsc2U7XG4gICAgICB0b2RvRGlzcGxheS5zdHlsZS50ZXh0RGVjb3JhdGlvbiA9ICdub25lJztcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoY3VycmVudEFjY291bnQpKTtcbiAgICB9XG4gIH0pO1xuICB0b2Rvcy5hcHBlbmQodG9kb0Rpc3BsYXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3VG9kbyhjdXJyZW50UHJvamVjdCwgdG9kb3MsIGN1cnJlbnRBY2NvdW50KSB7XG4gIGxldCBhZGRUb2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGFkZFRvZG8uY2xhc3NOYW1lID0gJ2FkZC10b2RvJztcbiAgYWRkVG9kby5pbm5lckhUTUwgPSAnQWRkIG5ldyB0YXNrJztcbiAgYWRkVG9kby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB0b2Rvcy5yZW1vdmVDaGlsZChhZGRUb2RvKTtcbiAgICBsZXQgY3JlYXRlVG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCB0b2RvVGl0bGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGV0IHRvZG9JbnB1dFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsZXQgdG9kb0Rlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxldCB0b2RvSW5wdXREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgbGV0IHRvZG9JbnB1dERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxldCB0b2RvU3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbGV0IHRvZG9EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsZXQgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICB0b2RvVGl0bGVMYWJlbC5pbm5lckhUTUwgPSAnVGl0bGUnO1xuICAgIHRvZG9UaXRsZUxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ3RvZG8tdGl0bGUtaW5wdXQnKTtcbiAgICB0b2RvRGVzY3JpcHRpb25MYWJlbC5pbm5lckhUTUwgPSAnRGVzY3JpcHRpb24nO1xuICAgIHRvZG9EZXNjcmlwdGlvbkxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ3RvZG8tZGVzY3JpcHRpb24taW5wdXQnKTtcbiAgICB0b2RvRGVzY3JpcHRpb25MYWJlbC5mb3IgPSAndG9kby1kZXNjcmlwdGlvbi1pbnB1dCc7XG4gICAgY3JlYXRlVG9kb0NvbnRhaW5lci5jbGFzc05hbWUgPSAnY3JlYXRlLXRvZG8tZm9ybSc7XG4gICAgdG9kb0lucHV0VGl0bGUuaWQgPSAndG9kby10aXRsZS1pbnB1dCc7XG4gICAgdG9kb0lucHV0RGVzY3JpcHRpb24uaWQgPSAndG9kby1kZXNjcmlwdGlvbi1pbnB1dCc7XG4gICAgdG9kb0lucHV0RGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb2x1bW4nLCA4MCk7XG4gICAgdG9kb0lucHV0RGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdyb3cnLCAzKTtcbiAgICB0b2RvU3VibWl0LmlubmVySFRNTCA9ICdTdWJtaXQnO1xuICAgIHRvZG9TdWJtaXQuaWQgPSAnc3VibWl0JztcbiAgICB0b2RvSW5wdXREYXRlLnNldEF0dHJpYnV0ZSgndHlwZScsICdkYXRlJyk7XG5cbiAgICB0b2RvU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHRvZG9JbnB1dFRpdGxlLnZhbHVlICE9ICcnKSB7XG4gICAgICAgIGxldCBuZXdUb2RvVGl0bGUgPSB0b2RvSW5wdXRUaXRsZS52YWx1ZTtcbiAgICAgICAgbGV0IG5ld1RvZG9EZXNjcmlwdGlvbiA9IHRvZG9JbnB1dERlc2NyaXB0aW9uLnZhbHVlO1xuICAgICAgICBsZXQgbmV3VG9kb0RhdGUgPSB0b2RvSW5wdXREYXRlLnZhbHVlO1xuICAgICAgICBpZiAodG9kb0lucHV0RGVzY3JpcHRpb24udmFsdWUgPT0gJycpIHtcbiAgICAgICAgICBuZXdUb2RvRGVzY3JpcHRpb24gPSAnRW1wdHknO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdUb2RvID0gdG9kbyhuZXdUb2RvVGl0bGUsIG5ld1RvZG9EZXNjcmlwdGlvbiwgbmV3VG9kb0RhdGUsIGZhbHNlKTtcbiAgICAgICAgY3VycmVudFByb2plY3QudG9kb3MucHVzaChuZXdUb2RvKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgICAgICB0b2RvVGl0bGUuaW5uZXJIVE1MID0gbmV3VG9kby50aXRsZTtcbiAgICAgICAgdG9kb0Rpc3BsYXkuYXBwZW5kKGNoZWNrYm94LCB0b2RvVGl0bGUpO1xuICAgICAgICAvLyB0b2Rvcy5hcHBlbmQodG9kb0Rpc3BsYXkpO1xuICAgICAgICB0b2Rvcy5yZW1vdmVDaGlsZChjcmVhdGVUb2RvQ29udGFpbmVyKTtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb1N1Ym1pdCk7XG4gICAgICAgIGRpc3BsYXlUb2RvKG5ld1RvZG8sIHRvZG9zLCBjdXJyZW50QWNjb3VudCk7XG5cbiAgICAgICAgb3BlblRvZG8odG9kb3MubGFzdENoaWxkLCB0b2RvcywgY3VycmVudEFjY291bnQsIGN1cnJlbnRQcm9qZWN0KTtcbiAgICAgICAgdG9kb3MuYXBwZW5kQ2hpbGQoYWRkVG9kbyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2Rvcy5yZW1vdmVDaGlsZChjcmVhdGVUb2RvQ29udGFpbmVyKTtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb1N1Ym1pdCk7XG4gICAgICAgIHRvZG9zLmFwcGVuZENoaWxkKGFkZFRvZG8pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY3JlYXRlVG9kb0NvbnRhaW5lci5hcHBlbmQodG9kb1RpdGxlTGFiZWwsIHRvZG9JbnB1dFRpdGxlLCB0b2RvRGVzY3JpcHRpb25MYWJlbCwgdG9kb0lucHV0RGVzY3JpcHRpb24sIHRvZG9JbnB1dERhdGUpO1xuICAgIHRvZG9zLmFwcGVuZChjcmVhdGVUb2RvQ29udGFpbmVyKTtcbiAgICB0b2Rvcy5hcHBlbmQodG9kb1N1Ym1pdCk7XG5cbiAgICB0b2RvSW5wdXRUaXRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09ICdFbnRlcicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpLmNsaWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdG9kb0lucHV0RGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PSAnRW50ZXInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKS5jbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGFkZFRvZG87XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuVG9kbyhlbGVtZW50LCB0b2RvcywgY3VycmVudEFjY291bnQsIGN1cnJlbnRQcm9qZWN0KSB7XG4gIHZhciBub2RlcyA9IEFycmF5LmZyb20odG9kb3MuY2hpbGRyZW4pO1xuICAvLyBDbGljayBvbiB0b2RvcyB0byBcIm9wZW5cIiB0aGVtXG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09ICdESVYnKSB7XG4gICAgICB0YXJnZXQgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICAvLyBDaGlsZHJlbiBhcmUgbm90IGFmZmVjdGVkIGJ5IGV2ZW50LlxuICAgIGlmICh0YXJnZXQgIT09IHRoaXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGxldCBpbmRleCA9IG5vZGVzLmluZGV4T2YodGFyZ2V0KTtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIGxldCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBsZXQgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGV0IGRvbmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBsZXQgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbGV0IGJ1dHRvbnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidXR0b25zQ29udGFpbmVyLmlkID0gJ3RvZG8tYnV0dG9ucyc7XG4gICAgZG9uZUJ1dHRvbi5pZCA9ICdkb25lLXRhc2stYnV0dG9uJztcbiAgICByZW1vdmVCdXR0b24uaWQgPSAncmVtb3ZlLXRhc2stYnV0dG9uJztcbiAgICBkdWVEYXRlLmlkID0gJ2R1ZS1kYXRlJztcbiAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2NvbHVtbicsIDgwKTtcbiAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ3JvdycsIDUpO1xuICAgIGRlc2NyaXB0aW9uLmlkID0gJ3RvZG8tZGVzY3JpcHRpb24nO1xuICAgIGR1ZURhdGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2RhdGUnKTtcbiAgICBkdWVEYXRlLnZhbHVlID0gY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLmR1ZURhdGU7XG4gICAgdG9kb0NvbnRhaW5lci5jbGFzc05hbWUgPSAndG9kby1zZWN0aW9uJztcbiAgICB0aXRsZS5pZCA9ICd0b2RvLXRpdGxlJztcbiAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ2NvbHVtbicsIDgwKTtcbiAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ3JvdycsIDEpO1xuICAgIHRpdGxlLnZhbHVlID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKS5pbm5lclRleHQ7XG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSBjdXJyZW50UHJvamVjdC50b2Rvc1tpbmRleF0uZGVzY3JpcHRpb247XG5cbiAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZG9uZUJ1dHRvbi5jbGljaygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmQocmVtb3ZlQnV0dG9uLCBkb25lQnV0dG9uKTtcbiAgICB0b2RvQ29udGFpbmVyLmFwcGVuZCh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGJ1dHRvbnNDb250YWluZXIpO1xuICAgIHJlbW92ZUJ1dHRvbi5pbm5lclRleHQgPSAnRGVsZXRlIHRhc2snO1xuXG4gICAgLy8gUmVtb3ZlIGEgdGFza1xuICAgIHJlbW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0b2Rvcy5yZW1vdmVDaGlsZCh0b2RvQ29udGFpbmVyKTtcbiAgICAgIHRvZG9zLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICB0b2Rvcy5yZW1vdmVDaGlsZCh0b2Rvcy5sYXN0Q2hpbGQpO1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRvZG9zLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpIHtcbiAgICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIGRpc3BsYXlUb2RvKGN1cnJlbnRQcm9qZWN0LnRvZG9zW2ldLCB0b2RvcywgY3VycmVudEFjY291bnQpO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdG9kb3MucXVlcnlTZWxlY3RvckFsbCgnbGknKSkge1xuICAgICAgICBvcGVuVG9kbyhlbGVtZW50LCB0b2RvcywgY3VycmVudEFjY291bnQsIGN1cnJlbnRQcm9qZWN0KTtcbiAgICAgIH1cbiAgICAgIHRvZG9zLmFwcGVuZENoaWxkKGFkZE5ld1RvZG8oY3VycmVudFByb2plY3QsIHRvZG9zLCBjdXJyZW50QWNjb3VudCkpO1xuICAgIH0pO1xuXG4gICAgZG9uZUJ1dHRvbi5pbm5lclRleHQgPSAnRG9uZSc7XG4gICAgZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIC8vIElmIHRpdGxlIGlzIGVtcHR5LCBzYXZlIHRoZSBuZXcgZGVzY3JpcHRpb24gYnV0IGxlYXZlIHRoZSBwcmV2aW91cyB0aXRsZS5cbiAgICAgIGlmICh0aXRsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICB0b2Rvcy5yZW1vdmVDaGlsZCh0b2RvQ29udGFpbmVyKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICBjdXJyZW50UHJvamVjdC50b2Rvc1tpbmRleF0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi52YWx1ZTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjdXJyZW50UHJvamVjdC50b2Rvc1tpbmRleF0udGl0bGUgPSB0aXRsZS52YWx1ZTtcbiAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zW2luZGV4XS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uLnZhbHVlO1xuICAgICAgY3VycmVudFByb2plY3QudG9kb3NbaW5kZXhdLmR1ZURhdGUgPSBkdWVEYXRlLnZhbHVlO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShjdXJyZW50QWNjb3VudCkpO1xuICAgICAgdG9kb3MucmVtb3ZlQ2hpbGQodG9kb0NvbnRhaW5lcik7XG4gICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdicpWzBdLmlubmVyVGV4dCA9IHRpdGxlLnZhbHVlO1xuICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKVsxXS5pbm5lclRleHQgPSBkdWVEYXRlLnZhbHVlO1xuXG4gICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgfSk7XG4gICAgdG9kb3MuaW5zZXJ0QmVmb3JlKHRvZG9Db250YWluZXIsIHRvZG9zLmNoaWxkcmVuW2luZGV4XSk7XG4gIH0pO1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS10b2Rvcy1iZzogI0UyRTJFMjtcXG4gIC0tdG9kb3MtZmc6ICMyNDI5MkU7XFxuICAtLXRvZG9zLWRpdmlkZXI6IGdyZXk7XFxuICAtLXByb2plY3RzLWJnOiAjYzRjNGM0O1xcbiAgLS1wcm9qZWN0cy1zZWxlY3RlZC1iZzogcmdiKDE0NiwgMTQ2LCAxNDYpO1xcbiAgLS1kYXNoYm9hcmQtZGl2aWRlcjogYmxhY2s7XFxuICAtLWJ1dHRvbnMtaG92ZXItYmc6ICNhYWFhYWE7XFxuICAtLXRvZG8tYm9yZGVyOiByZ2IoMTMzLCAxMzMsIDEzMyk7XFxuICAtLXRvZG8tZGF0ZS1ncmVlbjogZ3JlZW47XFxuICAtLXRvZG8tdGl0bGUtYmc6IHRyYW5zcGFyZW50O1xcbiAgY29sb3Itc2NoZW1lOiBsaWdodDtcXG59XFxuXFxuOnJvb3QubGlnaHQge1xcbiAgLS10b2Rvcy1iZzogI0UyRTJFMjtcXG4gIC0tdG9kb3MtZmc6ICMyNDI5MkU7XFxuICAtLXRvZG9zLWRpdmlkZXI6IGdyZXk7XFxuICAtLXByb2plY3RzLWJnOiAjYzRjNGM0O1xcbiAgLS1wcm9qZWN0cy1zZWxlY3RlZC1iZzogcmdiKDE0NiwgMTQ2LCAxNDYpO1xcbiAgLS1kYXNoYm9hcmQtZGl2aWRlcjogYmxhY2s7XFxuICAtLWJ1dHRvbnMtaG92ZXItYmc6ICNhYWFhYWE7XFxuICAtLXRvZG8tYm9yZGVyOiByZ2IoMTMzLCAxMzMsIDEzMyk7XFxuICAtLXRvZG8tZGF0ZS1ncmVlbjogZ3JlZW47XFxuICAtLXRvZG8tdGl0bGUtYmc6IHRyYW5zcGFyZW50O1xcbiAgY29sb3Itc2NoZW1lOiBsaWdodDtcXG59XFxuXFxuOnJvb3QuZGFyayB7XFxuICAtLXRvZG9zLWJnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1mZzogI0UyRTJFMjtcXG4gIC0tdG9kb3MtZGl2aWRlcjogZ3JleTtcXG4gIC0tcHJvamVjdHMtYmc6ICMxRjI0Mjg7XFxuICAtLXByb2plY3RzLXNlbGVjdGVkLWJnOiByZ2IoMTEyLCAxMTIsIDExMik7XFxuICAtLWRhc2hib2FyZC1kaXZpZGVyOiBibGFjaztcXG4gIC0tYnV0dG9ucy1ob3Zlci1iZzogIzQxNDk1MDtcXG4gIC0tdG9kby1ib3JkZXI6IHJnYigxMzMsIDEzMywgMTMzKTtcXG4gIC0tdG9kby1kYXRlLWdyZWVuOiAjNzJmZjcyO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogZGFyaztcXG59XFxuXFxuI3RvZG9zLWNvbnRhaW5lciBidXR0b24sICNhZGQtcHJvamVjdC1idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIgYnV0dG9uOmhvdmVyLCAjYWRkLXByb2plY3QtYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJ1dHRvbnMtaG92ZXItYmcpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG5cXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcblxcbi5kYXNoYm9hcmQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDMwMHB4LCA0MDBweCk7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG5saSB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG51bCB7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4ucHJvamVjdHMtY29udGFpbmVyIHtcXG4gIC8qIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWRhc2hib2FyZC1kaXZpZGVyKTsgKi9cXG4gIGdyaWQtY29sdW1uOiAxO1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJvamVjdHMtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIHBhZGRpbmc6IDJyZW07XFxufVxcblxcbi5wcm9qZWN0cy1jb250YWluZXIgbGkge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgbWFyZ2luOiAwLjVyZW0gMCAwLjVyZW0gMDtcXG59XFxuXFxuLnByb2plY3RzIC5wcm9qZWN0IHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnByb2plY3Quc2VsZWN0ZWQtcHJvamVjdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm9qZWN0cy1zZWxlY3RlZC1iZyk7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcblxcbi5wcm9qZWN0LW1lbnUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5wcm9qZWN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucHJvamVjdC1idXR0b25zIGJ1dHRvbiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10b2Rvcy1kaXZpZGVyKTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG5cXG59XFxuXFxuI2RlbGV0ZS1wcm9qZWN0OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTcsIDc3LCA3Nyk7XFxufVxcblxcbi5kZWxldGUtcHJvamVjdCB7XFxuICB3aWR0aDogMnJlbTtcXG4gIGhlaWdodDogMnJlbTtcXG59XFxuXFxuI3RvZG9zLWNvbnRhaW5lciB7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRvZG9zLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBmbGV4LXNocmluazogMDtcXG4gIHBhZGRpbmctdG9wOiAxMHZoO1xcbn1cXG5cXG4jaW5uZXItcHJvamVjdC10aXRsZSB7XFxuICBmb250LXNpemU6IDEuM3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XFxufVxcblxcbiN0b2RvcyB7XFxuICB3aWR0aDogODAlO1xcbiAgbWF4LXdpZHRoOiA4MDBweDtcXG59XFxuXFxubGkgLmNoZWNrYm94IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb2plY3RzLWJnKTtcXG59XFxuXFxuLnRvZG8tc2VjdGlvbiB7XFxuICBwYWRkaW5nOiAxLjFyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxLjFyZW07XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI3RvZG8tdGl0bGUsICN0b2RvLWRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRvZG8tYm9yZGVyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogNDAwcHg7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblxcbiN0b2RvLWJ1dHRvbnMge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuI3RvZG8tYnV0dG9ucyBidXR0b24ge1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG4jdG9kby10aXRsZSB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10b2RvLXRpdGxlLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBoZWlnaHQ6IDIycHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4jdG9kby1idXR0b25zICNyZW1vdmUtdGFzay1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5NywgNzcsIDc3KTtcXG59XFxuXFxuI3RvZG8tZGVzY3JpcHRpb24ge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG9kby10aXRsZS1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgaGVpZ2h0OiA1cmVtO1xcbn1cXG5cXG4jdG9kby10aXRsZTpmb2N1cywgI3RvZG8tZGVzY3JpcHRpb246Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuI3RvZG9zIGxpIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbiAgcGFkZGluZzogMS4xcmVtIDAgMS4xcmVtIDEuMXJlbTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10b2Rvcy1kaXZpZGVyKTtcXG59XFxuXFxuI3RvZG9zIGxpOmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY2hlY2tib3gge1xcbiAgd2lkdGg6IDEuNXJlbTtcXG4gIGhlaWdodDogMS41cmVtO1xcbn1cXG5cXG4uYWRkLXRvZG8ge1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xcbn1cXG5cXG4uY3JlYXRlLXRvZG8tZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI3RvZG8tdGl0bGUtaW5wdXQge1xcbiAgd2lkdGg6IDMwcmVtO1xcbn1cXG5cXG4jdG9kby1kZXNjcmlwdGlvbi1pbnB1dCB7XFxuICBoZWlnaHQ6IDVyZW07XFxuICB3aWR0aDogMzByZW07XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltd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YztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8mZGlzcGxheT1zd2FwJyk7XFxuXFxuXFxuOnJvb3Qge1xcbiAgLS10b2Rvcy1iZzogI0UyRTJFMjtcXG4gIC0tdG9kb3MtZmc6ICMyNDI5MkU7XFxuICAtLXRvZG9zLWRpdmlkZXI6IGdyZXk7XFxuICAtLXByb2plY3RzLWJnOiAjYzRjNGM0O1xcbiAgLS1wcm9qZWN0cy1zZWxlY3RlZC1iZzogcmdiKDE0NiwgMTQ2LCAxNDYpO1xcbiAgLS1kYXNoYm9hcmQtZGl2aWRlcjogYmxhY2s7XFxuICAtLWJ1dHRvbnMtaG92ZXItYmc6ICNhYWFhYWE7XFxuICAtLXRvZG8tYm9yZGVyOiByZ2IoMTMzLCAxMzMsIDEzMyk7XFxuICAtLXRvZG8tZGF0ZS1ncmVlbjogZ3JlZW47XFxuICAtLXRvZG8tdGl0bGUtYmc6IHRyYW5zcGFyZW50O1xcbiAgY29sb3Itc2NoZW1lOiBsaWdodDtcXG59XFxuXFxuOnJvb3QubGlnaHQge1xcbiAgLS10b2Rvcy1iZzogI0UyRTJFMjtcXG4gIC0tdG9kb3MtZmc6ICMyNDI5MkU7XFxuICAtLXRvZG9zLWRpdmlkZXI6IGdyZXk7XFxuICAtLXByb2plY3RzLWJnOiAjYzRjNGM0O1xcbiAgLS1wcm9qZWN0cy1zZWxlY3RlZC1iZzogcmdiKDE0NiwgMTQ2LCAxNDYpO1xcbiAgLS1kYXNoYm9hcmQtZGl2aWRlcjogYmxhY2s7XFxuICAtLWJ1dHRvbnMtaG92ZXItYmc6ICNhYWFhYWE7XFxuICAtLXRvZG8tYm9yZGVyOiByZ2IoMTMzLCAxMzMsIDEzMyk7XFxuICAtLXRvZG8tZGF0ZS1ncmVlbjogZ3JlZW47XFxuICAtLXRvZG8tdGl0bGUtYmc6IHRyYW5zcGFyZW50O1xcbiAgY29sb3Itc2NoZW1lOiBsaWdodDtcXG59XFxuXFxuOnJvb3QuZGFyayB7XFxuICAtLXRvZG9zLWJnOiAjMjQyOTJFO1xcbiAgLS10b2Rvcy1mZzogI0UyRTJFMjtcXG4gIC0tdG9kb3MtZGl2aWRlcjogZ3JleTtcXG4gIC0tcHJvamVjdHMtYmc6ICMxRjI0Mjg7XFxuICAtLXByb2plY3RzLXNlbGVjdGVkLWJnOiByZ2IoMTEyLCAxMTIsIDExMik7XFxuICAtLWRhc2hib2FyZC1kaXZpZGVyOiBibGFjaztcXG4gIC0tYnV0dG9ucy1ob3Zlci1iZzogIzQxNDk1MDtcXG4gIC0tdG9kby1ib3JkZXI6IHJnYigxMzMsIDEzMywgMTMzKTtcXG4gIC0tdG9kby1kYXRlLWdyZWVuOiAjNzJmZjcyO1xcbiAgLS10b2RvLXRpdGxlLWJnOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yLXNjaGVtZTogZGFyaztcXG59XFxuXFxuI3RvZG9zLWNvbnRhaW5lciBidXR0b24sICNhZGQtcHJvamVjdC1idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxufVxcblxcbiN0b2Rvcy1jb250YWluZXIgYnV0dG9uOmhvdmVyLCAjYWRkLXByb2plY3QtYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJ1dHRvbnMtaG92ZXItYmcpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG5cXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcblxcbi5kYXNoYm9hcmQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDMwMHB4LCA0MDBweCk7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG5saSB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG51bCB7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4ucHJvamVjdHMtY29udGFpbmVyIHtcXG4gIC8qIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWRhc2hib2FyZC1kaXZpZGVyKTsgKi9cXG4gIGdyaWQtY29sdW1uOiAxO1xcbiAgZ3JpZC1yb3c6IDEgLyAyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHJvamVjdHMtYmcpO1xcbiAgY29sb3I6IHZhcigtLXRvZG9zLWZnKTtcXG4gIHBhZGRpbmc6IDJyZW07XFxufVxcblxcbi5wcm9qZWN0cy1jb250YWluZXIgbGkge1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgbWFyZ2luOiAwLjVyZW0gMCAwLjVyZW0gMDtcXG59XFxuXFxuLnByb2plY3RzIC5wcm9qZWN0IHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnByb2plY3Quc2VsZWN0ZWQtcHJvamVjdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm9qZWN0cy1zZWxlY3RlZC1iZyk7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxufVxcblxcbi5wcm9qZWN0LW1lbnUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5wcm9qZWN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucHJvamVjdC1idXR0b25zIGJ1dHRvbiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10b2Rvcy1kaXZpZGVyKTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG5cXG59XFxuXFxuI2RlbGV0ZS1wcm9qZWN0OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTcsIDc3LCA3Nyk7XFxufVxcblxcbi5kZWxldGUtcHJvamVjdCB7XFxuICB3aWR0aDogMnJlbTtcXG4gIGhlaWdodDogMnJlbTtcXG59XFxuXFxuI3RvZG9zLWNvbnRhaW5lciB7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRvZG9zLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBmbGV4LXNocmluazogMDtcXG4gIHBhZGRpbmctdG9wOiAxMHZoO1xcbn1cXG5cXG4jaW5uZXItcHJvamVjdC10aXRsZSB7XFxuICBmb250LXNpemU6IDEuM3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XFxufVxcblxcbiN0b2RvcyB7XFxuICB3aWR0aDogODAlO1xcbiAgbWF4LXdpZHRoOiA4MDBweDtcXG59XFxuXFxubGkgLmNoZWNrYm94IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb2plY3RzLWJnKTtcXG59XFxuXFxuLnRvZG8tc2VjdGlvbiB7XFxuICBwYWRkaW5nOiAxLjFyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxLjFyZW07XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdG9kb3MtZGl2aWRlcik7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI3RvZG8tdGl0bGUsICN0b2RvLWRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRvZG8tYm9yZGVyKTtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogNDAwcHg7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblxcbiN0b2RvLWJ1dHRvbnMge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuI3RvZG8tYnV0dG9ucyBidXR0b24ge1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG4jdG9kby10aXRsZSB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10b2RvLXRpdGxlLWJnKTtcXG4gIGNvbG9yOiB2YXIoLS10b2Rvcy1mZyk7XFxuICBoZWlnaHQ6IDIycHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4jdG9kby1idXR0b25zICNyZW1vdmUtdGFzay1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5NywgNzcsIDc3KTtcXG59XFxuXFxuI3RvZG8tZGVzY3JpcHRpb24ge1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdG9kby10aXRsZS1iZyk7XFxuICBjb2xvcjogdmFyKC0tdG9kb3MtZmcpO1xcbiAgaGVpZ2h0OiA1cmVtO1xcbn1cXG5cXG4jdG9kby10aXRsZTpmb2N1cywgI3RvZG8tZGVzY3JpcHRpb246Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuI3RvZG9zIGxpIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbiAgcGFkZGluZzogMS4xcmVtIDAgMS4xcmVtIDEuMXJlbTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10b2Rvcy1kaXZpZGVyKTtcXG59XFxuXFxuI3RvZG9zIGxpOmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY2hlY2tib3gge1xcbiAgd2lkdGg6IDEuNXJlbTtcXG4gIGhlaWdodDogMS41cmVtO1xcbn1cXG5cXG4uYWRkLXRvZG8ge1xcbiAgbWFyZ2luLXRvcDogMXJlbTtcXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xcbn1cXG5cXG4uY3JlYXRlLXRvZG8tZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI3RvZG8tdGl0bGUtaW5wdXQge1xcbiAgd2lkdGg6IDMwcmVtO1xcbn1cXG5cXG4jdG9kby1kZXNjcmlwdGlvbi1pbnB1dCB7XFxuICBoZWlnaHQ6IDVyZW07XFxuICB3aWR0aDogMzByZW07XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImNyZWF0ZURlbW8iLCJhZGROZXdQcm9qZWN0IiwiZGlzcGxheVByb2plY3QiLCJzd2l0Y2hQcm9qZWN0IiwiYWRkTmV3VG9kbyIsIm9wZW5Ub2RvIiwiZGlzcGxheVRvZG8iLCJkYXNoYm9hcmQiLCJjb250ZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicHJvamVjdHNDb250YWluZXIiLCJzaWRlYmFyIiwidG9kb3NDb250YWluZXIiLCJ0b2RvcyIsInRoZW1lVG9nZ2xlIiwiaW5uZXJIVE1MIiwiZGVtb0FjY291bnQiLCJpbmJveCIsImN1cnJlbnRQcm9qZWN0IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIkpTT04iLCJwYXJzZSIsInByb2plY3RzIiwiYWRkUHJvamVjdCIsImNsYXNzTmFtZSIsImlkIiwidG9kbyIsImFwcGVuZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb290IiwiZG9jdW1lbnRFbGVtZW50IiwibmV3VGhlbWUiLCJjb25zb2xlIiwibG9nIiwicXVlcnlTZWxlY3RvciIsInByb2plY3QiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZWxlbWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcm9qZWN0VGl0bGUiLCJmaXJzdENoaWxkIiwiYmVmb3JlIiwiYm9keSIsImFjY291bnQiLCJuYW1lIiwicHVzaCIsInRpdGxlIiwiYWRkVG9kbyIsImRlc2NyaXB0aW9uIiwiZHVlRGF0ZSIsIkRhdGUiLCJjb21wbGV0ZWQiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwidG9TdHJpbmciLCJwYWRTdGFydCIsImdldERhdGUiLCJqb2luIiwid2Vic2l0ZSIsIm15VG9kbyIsImNvbXBsZXRlZFRvZG8iLCJoYWxmRmlsbGVkVG9kbyIsIm15VG9kbzEiLCJ3ZWJzaXRlVG9kbyIsIndlYnNpdGVUb2RvMSIsImN1cnJlbnRBY2NvdW50IiwicHJvamVjdERpc3BsYXkiLCJtZW51IiwiZSIsInByb2plY3RNZW51IiwiY29udGFpbnMiLCJyZW1vdmVDaGlsZCIsInByb2plY3RJbnB1dCIsInByb2plY3RTdWJtaXQiLCJ2YWx1ZSIsIm5ld1Byb2plY3QiLCJhcHBlbmRDaGlsZCIsImV2ZW50Iiwia2V5IiwicHJldmVudERlZmF1bHQiLCJnZXRFbGVtZW50QnlJZCIsImNsaWNrIiwicHJvamVjdEVsZW1lbnQiLCJwcm9qZWN0Tm9kZXMiLCJBcnJheSIsImZyb20iLCJjaGlsZHJlbiIsInRhcmdldCIsInRhZ05hbWUiLCJyZW1vdmUiLCJpbmRleCIsImluZGV4T2YiLCJub2RlcyIsInByb2plY3RUaXRsZUlucHV0IiwiYnV0dG9uc0NvbnRhaW5lciIsImRvbmVCdXR0b24iLCJkZWxldGVCdXR0b24iLCJwYXJlbnRFbGVtZW50Iiwic3BsaWNlIiwiaSIsImxhc3RDaGlsZCIsInJlc3VsdFByb2plY3REaXNwbGF5IiwidG9kb0Rpc3BsYXkiLCJ0b2RvVGl0bGUiLCJjaGVja2JveCIsInRvZG9EYXRlIiwic2V0QXR0cmlidXRlIiwiY3VycmVudERhdGUiLCJzdHlsZSIsImNvbG9yIiwiY2hlY2tlZCIsInRleHREZWNvcmF0aW9uIiwiY3JlYXRlVG9kb0NvbnRhaW5lciIsInRvZG9UaXRsZUxhYmVsIiwidG9kb0lucHV0VGl0bGUiLCJ0b2RvRGVzY3JpcHRpb25MYWJlbCIsInRvZG9JbnB1dERlc2NyaXB0aW9uIiwidG9kb0lucHV0RGF0ZSIsInRvZG9TdWJtaXQiLCJmb3IiLCJuZXdUb2RvVGl0bGUiLCJuZXdUb2RvRGVzY3JpcHRpb24iLCJuZXdUb2RvRGF0ZSIsIm5ld1RvZG8iLCJkaXNwbGF5IiwidG9kb0NvbnRhaW5lciIsInJlbW92ZUJ1dHRvbiIsImlubmVyVGV4dCIsImluc2VydEJlZm9yZSJdLCJzb3VyY2VSb290IjoiIn0=