const twilio = require('twilio');

const createTwilioClient = (accountSid, authToken) => {
  return twilio(accountSid, authToken);
};

module.exports = { createTwilioClient };