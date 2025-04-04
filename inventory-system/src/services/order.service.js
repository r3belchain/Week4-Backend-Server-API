const { status } = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  return prisma.order.create({
    data: orderBody,
  });
};


/**
 * Get All Orders
 * @returns {Promise<orders>}
 */
const getAllOrders = async () => {
  const orders = await prisma.order.findMany();
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return prisma.order.findFirst({
    where: {
      id: id,
    },
  });
};


/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<updateOrder>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(status.NOT_FOUND, 'Order not found');
  }

  const updateOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data:{...updateBody},
  });

  return updateOrder;
};


/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(status.NOT_FOUND, 'Order not found');
  }

  const deleteOrder = await prisma.order.delete({
    where: {
      id: orderId,
    },
  });

  return deleteOrder;
};


/**
 * Get Order By UserID
 * @param {ObjectId} userId
 * @returns {Promise<Order>}
 */
const getOrdersByUser = async (userId) => {
  const user = await getOrderById(userId)
  if(!user) {
     throw new ApiError(status.NOT_FOUND, 'User not found');
  }
  return await prisma.order.findMany({
    where: { userId: parseInt(userId) },
  });
};


module.exports = {createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById, getOrdersByUser}