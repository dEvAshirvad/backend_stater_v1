import { Request, Response } from 'express';
import { UsersService } from './users.services';
import { JWTPayload, QueryOptions } from '@/types/globals';
import Respond from '@/lib/Respond';

export class UsersController {
  private usersService: UsersService;
  constructor() {
    this.usersService = new UsersService();
  }

  async getUsers(req: Request, res: Response) {
    try {
      const { page, limit, sort, ...query } = req.query;
      const options: QueryOptions = {
        page: Number(page),
        limit: Number(limit),
        sort: sort as string,
      };
      const users = await this.usersService.getUsersProfile(query, options);
      Respond(res, users, 200);
    } catch (error) {
      throw error;
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.user as JWTPayload;
      const user = await this.usersService.getUserById(id);
      Respond(res, user, 200);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.user as JWTPayload;
      const user = await this.usersService.updateUserProfile(id, req.body);
      Respond(res, user, 200);
    } catch (error) {
      throw error;
    }
  }

  async deActivateUser(req: Request, res: Response) {
    try {
      const { id } = req.user as JWTPayload;
      const user = await this.usersService.deActivateUser(id);
      Respond(res, user, 200);
    } catch (error) {
      throw error;
    }
  }
}
