import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import {
  IAcademicSemester,
  academicSemesterTitleCodeMapper,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // summer 02 !=== 03
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code.');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, skip, limit, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    // .sort({ createAt: 'desc' })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
