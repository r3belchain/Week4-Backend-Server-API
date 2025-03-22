const prisma = require("@prisma");
const AppError = require("@utils/AppError");

const createTodo = async (datas) => {
  const { title, description, userId } = datas;
  let { status } = datas;

  if (!status) status = "DRAFT";

  const create = await prisma.todo.create({
    data: { title, description, status, userId },
  });

  return create;
};

const deleteTodo = async (id) => {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
  });
  if (!todo) {
    throw new AppError("Todo not found!", 404);
  }
  const deleted = await prisma.todo.delete({ where: { id: parseInt(id) } });
  return deleted;
};

const updateTodo = async (id, data) => {
   const todo = await prisma.todo.findUnique({
     where: { id: parseInt(id) },
   });

   if(!todo) {
    throw new AppError('Todo not found!', 404)
   }
  const update = await prisma.todo.update({ where: { id: parseInt(id) }, data });
  return update;
};

const getAllTodos = async () => {
  return await prisma.todo.findMany();
};

module.exports = { createTodo, deleteTodo, updateTodo, getAllTodos };
