var toDoRepository = require('../repositories/toDoRepository');
var validationService = require('./validationService');


function ToDoService() {}


ToDoService.prototype.addItem = addItem;
ToDoService.prototype.updateToDo = updateToDo;
ToDoService.prototype.addBatch = addBatch;


//================================================================ 
function addItem(body, callback) {
    if (validationService.addToDoValidation(body, callback)) {
        body.dateCreated = Date();
        toDoRepository.add(body, callback);
    };
}

function addBatch(body,callback) {
	var errors = 0;
	body.forEach(function(element){
		if(!(validationService.addToDoValidation(element, callback))){
			errors +=1;
		} 
	});
	if(!errors){
		toDoRepository.addBatch(body, callback);
	};
}
//================================================================ 
function updateToDo(id, body, callback) {
    toDoRepository.setObjPropsById(id, body, callback);
}


module.exports = new ToDoService();