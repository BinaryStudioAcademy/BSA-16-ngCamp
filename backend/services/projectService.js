var projectRepository = require('../repositories/projectRepository');
var validationService = require('./validationService');

function ProjectService() {
}

ProjectService.prototype.addItem = addItem;
ProjectService.prototype.updateItem = updateItem;
ProjectService.prototype.deleteItem = deleteItem;


function addItem(body, callback) {
    if (validationService.ProjectValidation(body, callback)) {
        projectRepository.add(body, callback);
    }
}

function updateItem(id, body, callback) {
    projectRepository.setObjPropsById(id, body, callback);
}

function deleteItem(id, callback){
	var project = projectRepository.getById(id, function(err, project){
		if(project){
			project.remove(callback);
		}
	});
}

module.exports = new ProjectService();


