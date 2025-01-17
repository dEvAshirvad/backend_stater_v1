import express from 'express';
import usersRouter from './users/users.routes';
const router = express.Router();

router.use('/users', usersRouter);

export default router;
