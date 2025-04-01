const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation, productValidation } = require('../../validations');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').get(auth(), userController.getAllUsers);

router
  .route('/:userId')
  .get(auth(), validate(userValidation.getUserById), userController.getUserById)
  .patch(auth(), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth(), validate(userValidation.deleteUser), userController.deleteUser);

router
  .route('/:userId/products')
  .get(auth(), validate(productValidation.getProductsByUser), userController.getProductsByUser);
module.exports = router;
