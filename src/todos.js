import {todo} from './logic.js';

export function displayTodo(todo, todos, currentAccount) {
    let todoDisplay = document.createElement('li');
    let todoTitle = document.createElement('div');
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.className = 'checkbox';
    todoTitle.innerHTML = todo.title;
    todoDisplay.appendChild(checkbox);
    todoDisplay.appendChild(todoTitle);

    if (todo.completed) {
        checkbox.checked = true;
        todoDisplay.style.textDecoration = 'line-through';
    }
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            todo.completed = true;
            todoDisplay.style.textDecoration = 'line-through';
            localStorage.setItem('user', JSON.stringify(currentAccount));
        } else {
            todo.completed = false;
            todoDisplay.style.textDecoration = 'none';
            localStorage.setItem('user', JSON.stringify(currentAccount));
        }
    });
    todos.append(todoDisplay);
}

export function addNewTodo(currentProject, todos, currentAccount) {
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
        todoTitle.innerHTML = newTodo.title;
        todoDisplay.append(checkbox, todoTitle);
        // todos.append(todoDisplay);
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

export function openTodo(element, todos, currentAccount, currentProject) {
    var nodes = Array.from(todos.children);
    // Click on todos to "open" them

    element.addEventListener('click', function(e) {
        let target = e.target;
        if (e.target.tagName == 'DIV') {
            target = e.target.parentElement;
        }
    // Children are not affected by event.
      if (target !== this) {
        return;
      }
        element.style.display = 'none';
        let index = nodes.indexOf(target);
        let title = document.createElement('textarea'); 
        let todoContainer = document.createElement('div');
        let description = document.createElement('textarea');
        let doneButton = document.createElement('button');
        let removeButton = document.createElement('button');
        let buttonsContainer = document.createElement('div');
        
        description.setAttribute('column', 80);
        description.setAttribute('row', 5);
        description.id = 'todo-description';
        todoContainer.className = 'todo-section';
        title.id = 'todo-title';
        title.setAttribute('column', 80);
        title.setAttribute('row', 1);
        title.value = element.querySelector('div').innerText;
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

        // Remove a task
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
        localStorage.setItem('user', JSON.stringify(currentAccount));
        todos.removeChild(todoContainer);
        element.querySelector('div').innerText = title.value;
        element.style.display = 'flex';
        });
        todos.insertBefore(todoContainer, todos.children[index]);
    });
}