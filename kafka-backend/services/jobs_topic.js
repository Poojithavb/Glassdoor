const Jobs = require('../models/jobs');

module.exports.jobsService = function (msg, callback) {
  console.log('In jobs service path', msg.path);
  switch (msg.path) {
    case 'insertJobDetails':
      insertJobDetails(msg, callback);
      break;
  }
};

async function insertJobDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In post job details topic service. Msg: ', msg);
  console.log(msg.body);
  await Jobs.create(msg.body)
    .then((data) => {
      response.status = 200;
      response.message = 'Inserted Successfully';
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}