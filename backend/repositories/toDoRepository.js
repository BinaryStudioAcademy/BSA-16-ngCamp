var Repository = require('./generalRepository');
var ToDo = require('../schemas/toDoSchema');

function ToDoRepository() {
    Repository.prototype.constructor.call(this);
    this.model = ToDo;
}


ToDoRepository.prototype = new Repository();

model.exports = new ToDoRepository();