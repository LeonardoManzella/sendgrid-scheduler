var mail = {
    triggerMail: function (schedule) {
        if (!schedule.template_id && schedule.text) {
            client = require('sendgrid')(schedule.apiKey);
            helper = client.mail;
            from_email = new helper.Email(schedule.from);
            to_email = new helper.Email(schedule.to);
            subject = schedule.subject;
            content = new helper.Content("text/plain", schedule.text);
            mail = new helper.Mail(from_email, subject, to_email, content);
            sendMail(mail.toJSON(), client);
        }
        else if(!schedule.template_id && schedule.html){
            client = require('sendgrid')(schedule.apiKey);
            helper = client.mail;
            from_email = new helper.Email(schedule.from);
            to_email = new helper.Email(schedule.to);
            subject = schedule.subject;
            content = new helper.Content("text/html", schedule.html);
            mail = new helper.Mail(from_email, subject, to_email, content);
            sendMail(mail.toJSON(), client);
        }
        else {
            sendTemplateMail(schedule);
        }
    }
};

function sendTemplateMail(schedule) {

    var client = require('sendgrid')(schedule.apiKey);
    var helper = client.mail;
    var mail = new helper.Mail();
    email = new helper.Email(schedule.from);
    mail.setFrom(email);
    personalization = new helper.Personalization();
    email = new helper.Email(schedule.to);
    personalization.addTo(email);
    personalization.setSubject(schedule.subject);
    mail.addPersonalization(personalization);
    mail.setTemplateId(schedule.template_id);

    for (var p in filterData(schedule)) {
        if (schedule.hasOwnProperty(p)) {
            substitution = new helper.Substitution("-" + p + "-",schedule[p]);
            personalization.addSubstitution(substitution);
        }
    }
    sendMail(mail.toJSON(), client);
}

function filterData(schedule) {
    delete schedule.to;
    delete schedule.from;
    delete schedule.subject;
    delete schedule.apiKey;
    delete schedule.scheduleAt;
    delete schedule.template_id;
    delete schedule.isCompleted;
    delete schedule._id;
    delete schedule.mailJob;

    return schedule;

}

function sendMail(toSend, client) {

    var requestBody = toSend;
    var emptyRequest = require('sendgrid-rest').request;
    var requestPost = JSON.parse(JSON.stringify(emptyRequest));
    requestPost.method = 'POST';
    requestPost.path = '/v3/mail/send';
    requestPost.body = requestBody;
    client.API(requestPost, function (error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers)
    });
}

module.exports = mail;
