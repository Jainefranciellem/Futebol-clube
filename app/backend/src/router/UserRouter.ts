import { Request, Router, Response } from 'express';

import ValidateLogin from '../middlewares/validationLogin';
import ValidateToken from '../middlewares/validationToken';
import UserController from '../controllers/UserController';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/login',
  ValidateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

userRouter.get(
  '/login/role',
  ValidateToken,
  (_req: Request, res: Response) => res.status(200).json({ role: res.locals.user.role }),
);

export default userRouter;
