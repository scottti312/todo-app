export function displayTodos(currentProject, todos, currentAccount) {
  for (const todo of currentProject.todos) {
    let todoDisplay = document.createElement('li');
    let todoTitle = document.createElement('div');
    let checkbox = document.createElement('button');
    todoTitle.innerHTML = todo.title;
    todoDisplay.appendChild(checkbox);
    todoDisplay.appendChild(todoTitle)
    
    todos.append(todoDisplay);
  }
  todos.append(addNewTodo(currentProject, todos, currentAccount))
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

export function openTodo(todos, currentAccount, currentProject) {
  var nodes = Array.from(todos.children);
  // Click on todos to "open" them
  for (const element of todos.querySelectorAll('li')) {
    element.addEventListener('click', function(e) {
        let target = e.target;
        if (e.target.tagName == 'DIV') {
            console.log('happened');
            target = e.target.parentElement;
        }
    // Children are not affected by event.
    //   if (e.target !== this) {
    //     return;
    //   }
      element.style.display = 'none';
      let title = document.createElement('textarea'); 
      let index = nodes.indexOf(target);
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
        localStorage.setItem('user', JSON.stringify(currentAccount));
        todos.removeChild(todoContainer);
      });

      doneButton.innerText = 'Done';
      doneButton.addEventListener('click', () => {
        // If title is empty, save the new description but leave the previous title.
        if (title.value == '') {
          element.style.display = 'block';
          todos.removeChild(todoContainer);
          currentProject.todos[index].description = description.value;
          localStorage.setItem('user', JSON.stringify(currentAccount));
          return;
        }
        currentProject.todos[index].title = title.value;
        currentProject.todos[index].description = description.value;
        localStorage.setItem('user', JSON.stringify(currentAccount));
        todos.removeChild(todoContainer);
        element.querySelector('div').innerText = title.value;
        element.style.display = 'block';
      });
      todos.insertBefore(todoContainer, todos.children[index]);
    });
  }
}