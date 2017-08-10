import TimeEntrys from '../api/timeentrys';
import Tabular from 'meteor/aldeed:tabular';
import moment from 'moment';

new Tabular.Table({
  name: "TimeEntrys",
  collection: TimeEntrys,
  columns: [
    {data: "getProject().projectCode", title: "Project Code"},
    {
      data: "date",
      title: "Date",
      render: function (val, type, doc) {
        if (val instanceof Date) {
          return moment(val).format("DD/MM/YYYY");
        } else {
          return "(None))";
        }
      }
    },
    {data: "hours", title: "Hours"},
    {data: "description", title: "Description"}
  ],
  extraFields: ['userId', 'projectId']
});