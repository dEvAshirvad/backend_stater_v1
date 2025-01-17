import {
  IUser,
  IUserPreferences,
  IUserStatus,
  UserProfileUpdateParams,
  UserRoles,
} from '@/types/users/users.types';
import UserModel from './users.model';
import {
  createInterfaceExtractor,
  PhoneCodes,
} from '@/types/shared/shared.types';
import { FilterQuery } from 'mongoose';
import APIError from '@/errors/APIError';
import { PaginatedResult, QueryOptions } from '@/types/globals';

export class UsersService {
  private readonly userModel = UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async createUserUsingEmail(email: string, roles: UserRoles): Promise<IUser> {
    try {
      const user = await this.userModel.create({
        primaryEmail: email,
        emails: [email],
        roles,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUserUsingPhone(
    phone: Record<PhoneCodes, string>,
    roles: UserRoles
  ): Promise<IUser> {
    try {
      const user = await this.userModel.create({
        primaryPhone: phone,
        phones: [phone],
        roles,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUserUsingUsername(
    username: string,
    roles: UserRoles
  ): Promise<IUser> {
    try {
      const user = await this.userModel.create({
        username,
        roles,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  private async getUserByQuery(
    query: FilterQuery<IUser>
  ): Promise<IUser | null> {
    try {
      const user = await this.userModel.findOne(query);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new APIError({
          TITLE: 'User not found',
          MESSAGE: 'User not found',
          STATUS: 404,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserPreferences(id: string): Promise<IUserPreferences> {
    try {
      const user = await this.getUserById(id);
      if (!user) {
        throw new APIError({
          TITLE: 'User not found',
          MESSAGE: 'User not found',
          STATUS: 404,
        });
      }
      return createInterfaceExtractor<IUser>()([
        'language',
        'theme',
        'notifications',
        'privacy',
      ])(user);
    } catch (error) {
      throw error;
    }
  }

  async getUsersProfile(query: FilterQuery<IUser>, options: QueryOptions) {
    try {
      const { limit, sort, page } = options;
      const skip = (page - 1) * limit;
      const [users, totalDocs] = await Promise.all([
        this.userModel.find(query).limit(limit).skip(skip).sort(sort),
        this.userModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalDocs / limit);
      const nextPage = page < totalPages;
      const prevPage = page > 1;

      const docs = users.map((user) => {
        const { privacy } = createInterfaceExtractor<IUser>()(['privacy'])(
          user
        );
        const {
          firstName,
          lastName,
          username,
          primaryEmail,
          primaryPhone,
          publicMetaData,
          hasImage,
          imageUrl,
        } = createInterfaceExtractor<IUser>()([
          'firstName',
          'lastName',
          'username',
          'primaryEmail',
          'primaryPhone',
          'publicMetaData',
          'hasImage',
          'imageUrl',
        ])(user);

        return {
          firstName: privacy.showName ? firstName : undefined,
          lastName: privacy.showName ? lastName : undefined,
          username,
          primaryEmail: privacy.showEmail ? primaryEmail : undefined,
          primaryPhone: privacy.showPhone ? primaryPhone : undefined,
          hasImage,
          imageUrl,
          profile: publicMetaData.profile as UserProfileUpdateParams['profile'],
        };
      });

      return {
        docs,
        totalDocs,
        limit,
        totalPages,
        page,
        nextPage,
        prevPage,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUserPreferences(
    id: string,
    preferences: IUserPreferences
  ): Promise<IUser> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        id,
        { $set: preferences },
        { new: true }
      );
      if (!user) {
        throw new APIError({
          TITLE: 'User not found',
          MESSAGE: 'User not found',
          STATUS: 404,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile(
    id: string,
    updateParams: Partial<UserProfileUpdateParams>
  ): Promise<IUser> {
    try {
      const { profile } = updateParams;
      const user = await this.userModel.findByIdAndUpdate(
        id,
        { $set: { ...updateParams, publicMetaData: { profile } } },
        { new: true }
      );
      if (!user) {
        throw new APIError({
          TITLE: 'User not found',
          MESSAGE: 'User not found',
          STATUS: 404,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserStatus(id: string, status: IUserStatus): Promise<IUser> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        id,
        { $set: status },
        { new: true }
      );
      if (!user) {
        throw new APIError({
          TITLE: 'User not found',
          MESSAGE: 'User not found',
          STATUS: 404,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deActivateUser(id: string): Promise<IUser> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        id,
        { $set: { deleted: true } },
        { new: true }
      );
      if (!user) {
        throw new APIError({
          TITLE: 'User not found',
          MESSAGE: 'User not found',
          STATUS: 404,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
