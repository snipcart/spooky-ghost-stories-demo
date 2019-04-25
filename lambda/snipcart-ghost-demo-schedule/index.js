const GhostAdminAPI = require('@tryghost/admin-api');
const sgMail = require('@sendgrid/mail');
const axios = require('axios');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const ghost = new GhostAdminAPI({
  url: process.env.GHOST_HOST,
  key: process.env.GHOST_ADMIN_KEY,
  version: 'v2'
});

async function handler(event, context, callback) {

  var subscribers = await ghost.subscribers.browse();
  var emailHtml = (await axios.get(`${process.env.GHOST_HOST}/nl-stories-email/`, {responseType: 'text'})).data;

  const subscriberEmails = subscribers.map((s) => s.email);

  const msg = {
    to: subscriberEmails,
    from: 'Spooky Ghost Stories <geeks@snipcart.com>',
    subject: 'This week\'s content on Spooky Ghost Stories',
    html: emailHtml,
  };

  await sgMail.send(msg);

  for (let i = 0; i < subscribers.length; i++) {
    const subscriber = subscribers[i];
    await ghost.subscribers.delete({id: subscriber.id});
  }
};

exports.handler = handler;
