import { PhoneCodes } from '../shared/shared.types';

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUserInformation {
  roles: UserRoles;
  firstName: string;
  lastName: string;
  username: string;
  primaryEmail: string;
  primaryPhone: Record<PhoneCodes, string>;
  emails: string[];
  phones: Record<PhoneCodes, string>[];
  hasImage: boolean;
  imageUrl: string;
}

export interface IUserAuthenticationMethods {
  passwordEnabled: boolean;
  totpEnabled: boolean;
  twoFactorEnabled: boolean;
}

export interface IUserAuthentication {
  lastSignedInAt: Date;
}

export interface IUserMeta {
  publicMetaData: Record<string, any>;
  privateMetaData: Record<string, any>;
  unsafeMetaData: Record<string, any>;
  legalAcceptedAt: Date;
}

export interface IUserPreferences {
  language: string;
  theme: string;
  notifications: {
    email: boolean;
    phone: boolean;
    push: boolean;
  };
  privacy: {
    profileVisibilityPublic: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showName: boolean;
  };
}

export interface IUserStatus {
  banned: boolean;
  deleted: boolean;
}

export interface IUser
  extends IUserInformation,
    IUserAuthenticationMethods,
    IUserAuthentication,
    IUserMeta,
    IUserPreferences,
    IUserStatus {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileUpdateParams_USER
  extends IUserInformation,
    IUserPreferences {
  roles: UserRoles.USER;
  profile: {
    dob: Date;
    address: string;
  };
}

export interface UserProfileUpdateParams_ADMIN
  extends IUserInformation,
    IUserPreferences {
  roles: UserRoles.ADMIN;
  profile: {
    department: string;
    address: string;
  };
}

export type UserProfileUpdateParams =
  | UserProfileUpdateParams_USER
  | UserProfileUpdateParams_ADMIN;
