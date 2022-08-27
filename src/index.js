import './style.css';
import { dashboard } from './dashboard.js';

let container = document.createElement('div');
container.append(dashboard());
document.body.append(container);

