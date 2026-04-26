import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', error);

  // Default error response
  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred';
  let details: any = undefined;

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 422;
    errorCode = 'VALIDATION_ERROR';
    message = 'Validation failed';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    errorCode = 'INVALID_TOKEN';
    message = 'Invalid authentication token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    errorCode = 'TOKEN_EXPIRED';
    message = 'Authentication token has expired';
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    errorCode = 'DUPLICATE_ENTRY';
    message = 'A record with this value already exists';
    details = {
      field: (error as any).errors?.[0]?.path,
    };
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    errorCode = 'FOREIGN_KEY_CONSTRAINT';
    message = 'Referenced record does not exist';
  } else if (error.name === 'SequelizeValidationError') {
    statusCode = 400;
    errorCode = 'DATABASE_VALIDATION_ERROR';
    message = 'Database validation failed';
    details = (error as any).errors;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
  });
};
