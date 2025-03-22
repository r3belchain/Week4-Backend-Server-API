const prisma = require("@prisma");
const AppError = require("@utils/AppError");

const getAllUsers = async () =>
  prisma.user.findMany({ include: { todos: true } });

const getUserById = async (id) =>
  prisma.user.findUnique({
    where: { id: Number(id) },
    include: { todos: true },
  });

const createUser = async (datas) => {
  const { name, email, phone } = datas;
  prisma.user.create({ data: { name, email, phone } });
};

const updateUser = async (id, data) =>
  prisma.user.update({ where: { id: Number(id) }, data });

const deleteUser = async (id) =>
  prisma.user.delete({ where: { id: Number(id) } });

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
