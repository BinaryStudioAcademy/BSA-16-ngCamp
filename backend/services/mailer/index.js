var jade = require("jade");
var fs = require("fs");
var config = require("./config");
var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');

function Mailer() {
    this.sendEmail = sendEmail;
}

/**
 * [[Prepare email to sending]]
 * @param {
    [[Array]]to: "email reciever/s",
    [[String]]subject: "email title",
    [[String]]path: "path to file (*.pug, *.html)",
    [[String]]html: "use html raw instead 'path'",
    [[Object]]content: "variables for jade rendering"
}
 * @param {[[function]]} callback [[(err, data)]]
 */
function sendEmail(email, callback) {
    var context = {}; //emai context
    var response; //callback response
    if ((email.to && email.subject) && (email.path || email.html)) { //check for full data
        context.to = email.to.join(",");
        context.subject = email.subject;
        if (email.path) { //path or raw html
            var ext = email.path.substring(email.path.lastIndexOf(".") + 1, email.path.length); //file
            if (ext == "html" || ext == "pug") {
                if (ext == "html") { //html file
                    fs.readFile(email.path, function (err, data) {
                        if (err) {
                            response = "Can't open file, invalid path or file doesn't exist";
                            callback(response);
                        } else {
                            context.html = data.toString();
                            _send(context);
                            callback(null, "done");
                        }
                    });
                } else { //pug file
                    if (!email.content) {
                        response = "Message context missed";
                        callback(response);
                    } else {
                        try {
                            var html = jade.renderFile(email.path, email.content); //render jade
                            context.html = html;
                            _send(context);
                            callback(null, "done");
                        } catch (e) {
                            console.log(e);
                            response = "Failed to render .pug file";
                            callback(response);
                        }
                    }

                }
            } else {
                response = "Invalid path or file extention";
                callback(response);
            }
        } else {
            context.html = email.html;
            _send(context);
            callback(null, "done");
        }

    } else {
        response = "Required fields are 'to', 'subject',  'path'/'html'";
        callback(response);
    }
}
//==========================================================================
//==========================================================================
/**
 * [[Send email]]
 * @private
 * @param {to: "reciever", subject: "email title", html: "email html template"} context [[email context]]
 */
function _send(context) {
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: config.email,
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                refreshToken: config.refreshToken,
                accessToken: config.accessToken

            })
        }
    });
    context.from = config.emailBase;
    smtpTransport.sendMail(context);
}


module.exports = new Mailer();