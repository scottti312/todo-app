export function account(name) {
  let projects = [];
  function addProject(project) {
    projects.push(project);
  }
  return { addProject, projects, name }
}

export function project(title) {
  let todos = [];
  function addTodo(todo) {
    todos.push(todo);
  }
  return { account, addTodo, todos, title };
}

export function todo(title = 'Todo Title', description = 'Todo Description', dueDate = new Date(), completed = false) {
  if (typeof dueDate == 'object') {
    dueDate = [
      dueDate.getFullYear(),
      (dueDate.getMonth()+1).toString().padStart(2, '0'),
      (dueDate.getDate()).toString().padStart(2, '0'),
    ].join('-');
  }
  return { title, description, dueDate, completed };
}

export function createDemo() {
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
  return { demoAccount, inbox }
}
