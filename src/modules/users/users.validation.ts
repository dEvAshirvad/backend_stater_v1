import { z } from 'zod';
import { PhoneCodes } from '@/types/shared/shared.types';

// Enum validation
const UserRolesSchema = z.enum(['ADMIN', 'USER']);

// Base user information validation
const UserInformationSchema = z.object({
  roles: UserRolesSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  primaryEmail: z.string().email(),
  primaryPhone: z.record(z.nativeEnum(PhoneCodes), z.string()),
  emails: z.array(z.string().email()),
  phones: z.array(z.record(z.nativeEnum(PhoneCodes), z.string())),
  hasImage: z.boolean(),
  imageUrl: z.string().url(),
});

// Authentication methods validation
const UserAuthenticationMethodsSchema = z.object({
  passwordEnabled: z.boolean(),
  totpEnabled: z.boolean(),
  twoFactorEnabled: z.boolean(),
});

// User authentication validation
const UserAuthenticationSchema = z.object({
  lastSignedInAt: z.date(),
});

// User meta validation
const UserMetaSchema = z.object({
  publicMetaData: z.object({}),
  privateMetaData: z.object({}),
  unsafeMetaData: z.object({}),
  legalAcceptedAt: z.date(),
});

// Complete user validation
const UserSchema = UserInformationSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
  .merge(UserAuthenticationMethodsSchema)
  .merge(UserAuthenticationSchema)
  .merge(UserMetaSchema);

// Profile update validation for USER role
const UserProfileUpdateSchema_USER = UserInformationSchema.extend({
  roles: z.literal(UserRolesSchema.Enum.USER),
  profile: z.object({
    dob: z.date(),
    address: z.string(),
  }),
});

// Profile update validation for ADMIN role
const UserProfileUpdateSchema_ADMIN = UserInformationSchema.extend({
  roles: z.literal(UserRolesSchema.Enum.ADMIN),
  profile: z.object({
    department: z.string(),
    address: z.string(),
  }),
});

// Combined profile update validation
const UserProfileUpdateSchema = z.discriminatedUnion('roles', [
  UserProfileUpdateSchema_USER,
  UserProfileUpdateSchema_ADMIN,
]);

export {
  UserRolesSchema,
  UserInformationSchema,
  UserAuthenticationMethodsSchema,
  UserAuthenticationSchema,
  UserMetaSchema,
  UserSchema,
  UserProfileUpdateSchema_USER,
  UserProfileUpdateSchema_ADMIN,
  UserProfileUpdateSchema,
};
