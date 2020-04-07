const swag = require('../models/swag');

module.exports = {
  read: (reeq, res, next) => {
    res.status(200).send(swag);
  },
};
