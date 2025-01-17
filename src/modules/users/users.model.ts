import { IUser } from '@/types/users/users.types';
import { model, Schema } from 'mongoose';
import { UserRolesSchema } from './users.validation';

const UserSchema = new Schema<IUser>(
  {
    // User Information
    roles: {
      type: String,
      enum: UserRolesSchema.Values,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    primaryEmail: {
      type: String,
      unique: true,
    },
    primaryPhone: {
      type: Map,
      of: String,
    },
    emails: [
      {
        type: String,
      },
    ],
    phones: [
      {
        type: Map,
        of: String,
      },
    ],
    hasImage: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: '',
    },

    // Authentication Methods
    passwordEnabled: {
      type: Boolean,
      default: false,
    },
    totpEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    // Authentication
    lastSignedInAt: {
      type: Date,
      default: Date.now,
    },

    // Preferences
    language: {
      type: String,
      default: 'en',
    },
    theme: {
      type: String,
      default: 'light',
    },
    notifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
    privacy: {
      type: Schema.Types.Mixed,
      default: {},
    },

    // Status
    banned: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },

    // Meta Data
    publicMetaData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    privateMetaData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    unsafeMetaData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    legalAcceptedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>('tbl_users', UserSchema);

export default UserModel;
