const { status } = require('http-status');
const prisma = require('../../prisma/client');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  userBody.password = bcrypt.hash(userBody.password, 8);

  return await prisma.user.create({
    data: userBody,
  });
};


/**
 * Get all users
 * @returns {Promise<QueryResult>}
 */
const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return  await prisma.user.findUnique({
    where: { id },
  });

};

/**
 * Update user by ID
 * @param {string} id
 * @returns {Promise<User>}
 */

const updateUserByid = async (id, updateData) => {
  const user = await getUserById(id)
   if (!user) {
     throw new ApiError(status.NOT_FOUND, 'User not found');
   }
  return await prisma.user.update({
    where: { id },
    data: {...updateData}
  });
    
};

/**
 * Update user by ID
 * @param {string} id
 * @returns {Promise<User>}
 */

const deleteUserById = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};


module.exports = {
  createUser,
  getUserByEmail,
  updateUserByid,
  deleteUserById,
  getUserById,
  getAllUsers
};
