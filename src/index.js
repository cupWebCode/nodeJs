import * as tasks from './tasks/index';

const argv = process.argv;
const taskName = argv[2] || '';

if (tasks.hasOwnProperty(taskName)) {
  new tasks[taskName]();
}
