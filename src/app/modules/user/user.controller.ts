import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    res.status(200).json({
      success: true,
      message: 'Created user successfully',
      data: result,
    });
  }
);

export const UserController = {
  createStudent,
};
