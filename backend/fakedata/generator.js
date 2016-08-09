var casual = require('casual');
var mongoose = require('mongoose');
var userService = require('../services/userService');
var fileService = require('../services/fileService');
var fileRepository = require('../repositories/fileRepository');
var mongooseConnection = require('../db/dbConnect');
var toDoService  = require('../services/toDoService');
var projectService = require('../services/projectService');
var messageService = require('../services/messageService');
var eventService = require('../services/eventService');
var taskService = require('../services/taskService');    

var context = {
	userId : [],
	todoId: [],
	taskId: [],
	fileId: [],
	eventId: [],
	messageId: [],
	projectId: []
}

var untrackted = {
	task: []
}

casual.define('m_id', function(){
	return mongoose.Types.ObjectId();
});

casual.define('user', function() {
	var id = casual.m_id;
	context.userId.push(id);
    return {
    	_id: id,
        firstName: casual.first_name,
        lirstName: casual.last_name,
        email: casual.email,
        password: casual.password,
        role: casual.random_element(["create", "remove", "view", "list"]),
        position: casual.word,
        company: casual.company_name,
        imageUrl: casual.word
    }
});

casual.define('file', function() {
	var id = casual.m_id;
	context.fileId.push(id);
    return {
    	_id: id,
    	url: casual.word,
		description: casual.description,
		creationDate: casual.date(format = 'YYYY-MM-DD'),
		allowedTo: casual.random_element(context.userId)
    }
});

casual.define('task', function(){
	var id = casual.m_id;
	context.taskId.push(id);
	return {
		_id: id,
		title: casual.title,
    	project: casual.random_element(context.projectId),
    	description: casual.description,
    	author: casual.random_element(context.userId),
    	dateCreated: casual.date(format = 'YYYY-MM-DD'),
    	files: casual.random_element(context.fileId),
    	archived: casual.coin_flip,
    	isFinished: casual.coin_flip,
	}
})

casual.define('toDo', function(){
	var id = casual.m_id;
	context.todoId.push(id);
	var task = casual.task;
	untrackted.task.push(task);
	return{
		_id: id,
	    task: task._id,
   		title: casual.title,
   		description: casual.description,
   		status: casual.word,
   		participants: [casual.random_element(context.userId)],
   		dateExpired: casual.date(format = 'YYYY-MM-DD'),
   		dateFinished: casual.date(format = 'YYYY-MM-DD')
	}
});


casual.define('event', function(){
	var id = casual.m_id;
	context.eventId.push(id);
	var part = [];
	part.push(casual.random_element(context.userId));
	part.push(casual.random_element(context.userId));  
	var files = [];
	files.push[casual.random_element(context.fileId)];
	return {
		_id: id,
	    title: casual.title,
    	description: casual.description,
    	project: casual.random_element(context.projectId),
    	isAllDay: casual.coin_flip ,
    	startDate: casual.date(format = 'YYYY-MM-DD'),
    	endDate: casual.date(format = 'YYYY-MM-DD'),
    	participants: part,
	}
});

casual.define('message', function(){
	var id = casual.m_id;
	context.messageId.push(id);
	var comm = [];
	comm.push({author:casual.random_element(context.userId), date: casual.date(format = 'YYYY-MM-DD'), 
		description: casual.description, files: casual.word})
	return {
		_id: id,
	    isDraft: casual.coin_flip ,
    	title: casual.title,
    	description: casual.description,
    	author: casual.random_element(context.userId),
    	project: casual.random_element(context.projectId),
    	date: casual.date(format = 'YYYY-MM-DD'),
    	comments: comm,
    	files: casual.word
	}
});

casual.define('project', function(){
	var id = casual.m_id;
	context.projectId.push(id);
	var part = [];
	part.push(casual.random_element(context.userId));
	part.push(casual.random_element(context.userId));            ///   can be the same!!!!!!!!!!!!!!!
	return {
		_id: id,
        title: casual.title,
        description: casual.desctription,
        participants: part,
        startDate: casual.date(format = 'YYYY-MM-DD'),
        endDate: casual.date(format = 'YYYY-MM-DD'),
        version: casual.century,                                  
        repository: String
    }
})

function fakeMe(name, n){
	var sStr = '../services/'+ name +'Service';
	var service = require(sStr);
	for (var i=0; i<n; i++){
		service.addItem(casual[name], function(err, data){
			if(err){
				console.log(err)
			}
		});
	}
}

function fake(){
	var entities = ['user', 'project', 'message', 'event','file', 'toDo', 'task'];
	var n     =    [   3,       3,         3,        3,      3,      3,      3  ];
	var i = 0;
 	entities.forEach(function(e){
		fakeMe(e, n[i]);
		i++;
	})

	untrackted.task.forEach(function(t){
	taskService.addItem(t, function(err, data){
		if(err){
			console.log(err)
		}
	})
})
}

fake();

// function fake(){

// 	for (var i=0; i<3; i++){
// 		userService.addItem(casual.user, function(err, data){
// 			if(err){
// 				console.log(err)
// 			}
// 		});
// 	}

// 	for (var i=0; i<3; i++){
// 		projectService.addItem(casual.project, function(err, data){
// 			if(err){
// 				console.log(err)
// 			}
// 		});
// 	}

// 	 for (var i=0; i<3; i++){
// 	 	messageService.addItem(casual.message, function(err, data){
// 			if(err){
// 				console.log(err)
// 			}
// 		});
// 	}

// 	for (var i=0; i<3; i++){
// 		eventService.addEvent(casual.event, function(err, data){
// 			if(err){
// 				console.log(err)
// 			}
// 		});
// 	}

// 	for (var i=0; i<3; i++){
// 		fileService.addItem(casual.file, function(err, data){
// 			if(err){
// 				console.log(err)
// 			}
// 		});
// 	}

// 	for (var i=0; i<3; i++){
// 		toDoService.addToDo(casual.toDo, function(err, data){
// 			if(err){
// 				console.log(err)
// 			}
// 		});
// 	}

// 	for (var i=0; i<3; i++){
// 		taskService.addTask(casual.task, function(err, data){
// 			if(err){
// 				console.log(err)
// 			}
// 		});
// 	}
// 	untrackted.task.forEach(function(t){
// 		taskService.addTask(t, function(err, data){
// 			if(err){
// 				console.log(err)
// 			}
// 		})
// 	})

// };

// fake();


