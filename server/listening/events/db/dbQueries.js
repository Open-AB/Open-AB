const db = require('./dbConnection');
const qry = require('./dbQryStrs');

exports.hearVisit = (visitData, cb) => {
  const { versionId, IPAddress, time } = visitData;
  db.query({
    text: qry.createVisit,
    values: [versionId, IPAddress, time],
  },
  cb);
};

exports.hearClick = (clickData, cb) => {
  const { versionId, IPAddress, time } = clickData;
  db.query({
    text: qry.createClick,
    values: [versionId, IPAddress, time],
  },
  cb);
};
