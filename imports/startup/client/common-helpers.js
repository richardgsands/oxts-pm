import moment from 'moment';
import '/imports/api/collections/users.js';

Template.moment = moment;

Template.registerHelper('displayName', (userId) => {
    let user = Meteor.users.findOne(userId);
    return (user) ? user.displayName() : `No user found: ${userId}`;
});

Template.registerHelper('displayMonth', function (date, format) {
    const m = Template.moment(date, format);
    return m.format('MMM-YY');
})

Template.registerHelper('displayDate', function (date, format) {
    const m = Template.moment(date, format);
    return m.format('DD-MMM-YY');
})

// general stuff
Template.registerHelper('renderIf', (cond, str) => {
    return (cond) ? str : null;
});

Template.registerHelper('renderIfNot', (cond, str) => {
    return (!cond) ? str : null;
});

// extensions to raix handlebars helpers
Template.registerHelper('$concat', (a, b) => {
    return a + b;
});

Template.registerHelper('isActive', (a, b) => {
  return (a === b) ? " active" : null;
});

Template.registerHelper('getProp', (object, prop) => {
    return object[prop];
});

Template.registerHelper('objectKeys', (object) => {
    return Object.keys(object);
});