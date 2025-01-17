import { Router } from 'express';
import { UsersController } from './users.controller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/me', usersController.getUser);
usersRouter.put('/', usersController.updateUser);
usersRouter.delete('/', usersController.deActivateUser);

export default usersRouter;
