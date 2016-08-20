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
        else {
            sendTemplateMail(schedule);
        }
    }
};

function sendTemplateMail(schedule) {

    var client = require('sendgrid')(schedule.apiKey);
    var helper = client.mail;
    var mail = new helper.Mail();
    email = new helper.Email(schedule.from, "InstaSpaces Team");
    mail.setFrom(email);
    personalization = new helper.Personalization();
    email = new helper.Email(schedule.to, "Customer");
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


function sendConfirmationMail(schedule) {
    var client = require('sendgrid')(schedule.apiKey);
    var helper = client.mail;
    var mail = new helper.Mail();
    email = new helper.Email(schedule.from, "InstaSpaces Team");
    mail.setFrom(email);
    personalization = new helper.Personalization();
    email = new helper.Email(schedule.to, "Customer");
    personalization.addTo(email);
    personalization.setSubject(schedule.subject);
    substitution = new helper.Substitution("-name-", schedule.name);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-booking_id-", schedule.booking_id);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-link-", schedule.link);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-title-", schedule.title);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-start_time-", schedule.start_time);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-end_time-", schedule.end_time);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-tariff-", schedule.tariff);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-hours-", schedule.hours);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-tax-", schedule.tax);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-total-", schedule.total);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-status-", schedule.status);
    personalization.addSubstitution(substitution);
    mail.addPersonalization(personalization);
    mail.setTemplateId(schedule.template_id);

    sendMail(mail.toJSON(), client);
}


function sendExtendMail(schedule) {
    var client = require('sendgrid')(schedule.apiKey);
    var helper = client.mail;
    var mail = new helper.Mail();
    email = new helper.Email(schedule.from, "InstaSpaces Team");
    mail.setFrom(email);
    personalization = new helper.Personalization();
    email = new helper.Email(schedule.to, "Customer");
    personalization.addTo(email);
    personalization.setSubject(schedule.subject);

    substitution = new helper.Substitution("-name-", schedule.name);
    personalization.addSubstitution(substitution);
    substitution = new helper.Substitution("-link-", schedule.link);
    personalization.addSubstitution(substitution);
    mail.addPersonalization(personalization);
    mail.setTemplateId(schedule.template_id);

    sendMail(mail.toJSON(), client);
}

function sendFeedbackMail(schedule) {
    var client = require('sendgrid')(schedule.apiKey);
    var helper = client.mail;
    var mail = new helper.Mail();
    email = new helper.Email(schedule.from, "InstaSpaces Team");
    mail.setFrom(email);
    personalization = new helper.Personalization();
    email = new helper.Email(schedule.to, "Customer");
    personalization.addTo(email);
    personalization.setSubject(schedule.subject);

    substitution = new helper.Substitution("-name-", schedule.name);
    personalization.addSubstitution(substitution);
    mail.addPersonalization(personalization);
    mail.setTemplateId(schedule.template_id);

    sendMail(mail.toJSON(), client);
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
