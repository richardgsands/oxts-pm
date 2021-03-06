export default ApiCommon = {

    AutoformHashPickerDef(object, options) {
        options = options || {};

        return _.extend({
            type: 'select2',
            options: function() {
                return Object.keys(object).map(key => {
                    if (object[key])
                        return { label: `${key} (${object[key]})`, value: key }
                    else
                        return { label: `${key}`,                  value: key }
                });
            }
        }, options);
    },

    AutoformCollectionPickerDef(collection, labelProperty, options) {
        options = options || {};

        return _.extend({
            type: 'select2',
            options: function() {
                return collection.find({}).map(function(doc) {
                    return { label: doc[labelProperty], value: doc._id };
                });
            }
        }, options);
    },

    AutoformBootstrapDatepickerDef(options) {
        options = options || {};

        return _.extend({
            type: "bootstrap-datepicker",
            datePickerOptions: {
                autoclose: true,
                format: "dd/mm/yyyy"
            }
        }, options);
    },

    AutoformProjectPickerDef(options, nullOption) {
        options = options || {};

        return _.extend({
            label: "Project Code",
            type: 'select2',
            options: function() {
                let list = Projects.find({}).map(function(project) {
                    return { label: `${project.code} (${project.name})`, value: project._id };
                });
                if (nullOption) list.unshift({ label: nullOption, value: "" });
                return list;
            }
        }, options);
    },

    AutoformProjectActionPickerDef(options) {
        options = options || {};

        return _.extend({
            label: "Action",
            type: 'select2',
            options: function() {
                let options = ProjectActions.find({ projectId: Session.get('selectedProjectId') }).map(function(projectAction) {
                    return { label: `${projectAction.description}`, value: projectAction._id };
                });
                options.unshift({ label: "(General project time)", value: "" });
                return options;
            }
        }, options);
    },    
    
    AutoformUserPickerDef(options) {
        options = options || {};

        return {
            type: 'select2',
            options: function() {
                return Meteor.users.find({}).map(function(user) {
                    return { label: `${user.displayName()}`, value: user._id };
                });
            },
            select2Options: {
                width: '50%',
                multiple: options.multiple
            }
        };
    },

    AutoformGatePickerDef(options) {
        options = options || {};

        return {
            type: 'select2',
            options: function() {
                return [ { label: '(None)', value: null } ].concat(
                    Object.keys(Enums.ProjectGates).map(function(gateKey, index) {
                        return { label: Enums.ProjectGates[gateKey], value: gateKey };
                    })
                );
            },
            select2Options: {
                width: '50%'
            }
        };
    },

    TabularGetColumn(data, title, helper) {
        let column = { data, title };

        if (Meteor.isClient) {
            column.tmpl = Meteor.isClient && Template.autoFormInput
            column.tmplContext = (rowData) => {
                return {
                    doc: rowData,
                    data: data,               // i.e. doc property
                    helper: helper || null    // optional helper to use instead of doc property
                }
            }
        }

        return column;
    }

} 