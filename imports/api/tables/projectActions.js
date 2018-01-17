import ProjectActions from '../collections/projectActions.js';
import ProjectMilestones from '../collections/projectMilestones.js';
import Tabular from 'meteor/aldeed:tabular';
import moment from 'moment';

new Tabular.Table({
  name: "ProjectActions",
  collection: ProjectActions,
  columns: [
    {data: "status", title: "Status"},
    {data: "milestone", title: "this.getMilestone()"},
    {data: "description", title: "Action"},
    {data: "effort", title: "Effort (days)"},
    {data: "(o = this.getOwner()) ? o.displayName() : (No owner)", title: "Owner"},
    {
      data: "dueDate",
      title: "Due",
      render: function (val, type, doc) {
        if (val instanceof Date) {
          return moment(val).format("DD/MM/YYYY");
        } else {
          return "(None)";
        }
      }
    },
    {
      data: "completedDate",
      title: "Completed",
      render: function (val, type, doc) {
        if (val instanceof Date) {
          return moment(val).format("DD/MM/YYYY");
        } else {
          return "(None)";
        }
      }
    }
  ],
  extraFields: ['projectId', 'milestoneId', 'ownerId'],

  // DataTables options
  paging: false,
});