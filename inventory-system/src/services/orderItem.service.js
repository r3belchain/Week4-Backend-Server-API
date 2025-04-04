const { status } = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');
const {orderService} = require('./order.service');

/**
 * Create a order item
 * @param {Object} orderItemBody
 * @returns {Promise<OrderItem>}
 */
const createOrderItem = async (orderItemBody) => {
  return prisma.orderItem.create({
    data: orderItemBody,
  });
};

/**
 * Get All Item Orders
 * @returns {Promise<orderItems>}
 */
const getAllOrderItems = async () => {
  const orderItems = await prisma.orderItem.findMany();
  return orderItems;
};

/**
 * Get order item by id
 * @param {ObjectId} id
 * @returns {Promise<OrderItem>}
 */
const getOrderItemById = async (id) => {
  return prisma.orderItem.findFirst({
    where: {
      id: id,
    },
  });
};

/**
 * Update order item by id
 * @param {ObjectId} orderItemId
 * @param {Object} updateBody
 * @returns {Promise<updateOrderItem>}
 */
const updateOrderItemById = async (orderItemId, updateBody) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(status.NOT_FOUND, 'Order Item not found');
  }

  const updateOrderItem = await prisma.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: { ...updateBody },
  });

  return updateOrderItem;
};

/**
 * Delete order item by id
 * @param {ObjectId} orderItemId
 * @returns {Promise<OrderItem>}
 */
const deleteOrderItemById = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(status.NOT_FOUND, 'Order Item not found');
  }

  const deleteOrderItem = await prisma.orderItem.delete({
    where: {
      id: orderItemId,
    },
  });

  return deleteOrderItem;
};

/**
 * Get Order By orderID
 * @param {ObjectId} orderId
 * @returns {Promise<OrderItem>}
 */
const getOrderItemsByOrder = async (orderId) => {
  const order = await orderService.getOrderById(orderId);
  if (!order) {
    throw new ApiError(status.NOT_FOUND, 'Order not found');
  }
  return await prisma.orderItem.findMany({
    where: { orderId: parseInt(orderId) },
  });
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById,
  getOrderItemsByOrder,
};
