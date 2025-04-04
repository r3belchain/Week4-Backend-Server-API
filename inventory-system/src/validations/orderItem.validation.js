const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getOrderItemsByOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};


module.exports = {getOrderItemsByOrder}