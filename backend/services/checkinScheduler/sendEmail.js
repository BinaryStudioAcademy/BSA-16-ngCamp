var userRepository = require('../../repositories/userRepository');
var mailer = require('../mailer/index');

function sendEmailToCheckinPartisipants(p, question, projectName) {
	userRepository.getById(p, function(err, data){
		if(err){
			console.log(err);
			} else {
				var username = data.firstName + ' ' + data.lastName ;
				var mailPost = {
					to: [data.email],
    				subject: "invitation to answer survey",
    				path: "d:/BSA/BSA/email/checkIn-notification-template.pug",
   					html: "<b>Hello world 🐴</b>",
    				content: {
    					userName: username,
    					projectName: projectName,
    					description: question,
    					link: "Link to check-in"
    				}
				}
				mailer.sendEmail(mailPost, function(err, data){
					if(err){
						console.log(err);
					} else {
						console.log(mailPost);
					}
				})
			}
					
		});
}

module.exports = sendEmailToCheckinPartisipants