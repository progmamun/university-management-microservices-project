import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validations';

const router = express.Router();

router.get('/', StudentController.getAllFromDB);

router.get('/:id', StudentController.getByIdFromDB);

router.post(
  '/',
  validateRequest(StudentValidation.create),
  StudentController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(StudentValidation.update),
  StudentController.updateIntoDB
);
router.patch('/:id', StudentController.deleteFromDB);

export const studentRoutes = router;
