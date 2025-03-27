const { status } = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(status.CREATED).send({
    status: status.CREATED,
    message: 'Create User Success',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(status.OK).send({
    status: status.OK,
    message: 'Get Users Success',
    data: users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User Not Found');
  }

  res.status(status.OK).send({
    status: status.OK,
    message: 'Get User Success',
    data: user,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User Not Found');
  }

  res.status(status.OK).send({
    status: status.OK,
    message: 'Get User Success',
    data: user,
  });
});

const updateuser = catchAsync(async (req, res) => {
  const user = await userService.updateUserByid(req.params.userId, req.body);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User Not Found');
  }

  res.status(status.OK).send({
    status: status.OK,
    message: 'Update User Success',
    data: user,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.params.userId);
  if (!user) {
    throw new ApiError(status.NOT_FOUND, 'User Not Found');
  }
  res.status(status.OK).send({
    status: status.OK,
    message: 'Delete User Success',
    data: null,
  });
});

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateuser,
  deleteUser
};
