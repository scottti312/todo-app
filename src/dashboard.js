export default function dashboard() {
  let content = document.createElement('div');
  let header = document.createElement('div');
  let sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  content.className = 'dashboard';
  header.className = 'header';
  content.append(header);
  content.append(sidebar);


  return content;
}
