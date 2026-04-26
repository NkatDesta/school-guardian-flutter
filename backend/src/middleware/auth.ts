import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { JwtPayload } from '../types';
import { AuthenticatedRequest } from '../types/middleware';
import { hasPermission } from '../utils/permissions';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      error: {
        code: 'ACCESS_TOKEN_REQUIRED',
        message: 'Access token is required',
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  try {
    const decoded = AuthService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      },
      timestamp: new Date().toISOString(),
    });
  }
};

export const checkPermission = (permission: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!hasPermission(userRole || '', permission)) {
      res.status(403).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Insufficient permissions to access this resource',
          details: {
            required: permission,
            userRole,
          },
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    next();
  };
};

export const checkRole = (roles: string | string[]) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_ROLE',
          message: 'Insufficient role to access this resource',
          details: {
            required: allowedRoles,
            userRole,
          },
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    next();
  };
};
