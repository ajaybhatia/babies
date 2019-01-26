import '/imports/startup/client/index.jsx';

Meteor.callWithPromise = (method, ...params) => new Promise((resolve, reject) => {
  Meteor.call(method, ...params, (error, response) => {
    if (error) reject(error);
    resolve(response);
  });
});