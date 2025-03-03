import { BaseUserSchema } from 'src/buildingblocks/authorization/schemas/base-user.schema';
import { User } from 'src/domain/users/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  tableName: 'users',
  columns: {
    ...BaseUserSchema
  },
  relations: {
    roles: {
      target: 'role',
      type: 'many-to-many',
      joinTable: {
        name: 'users_roles'
      },
      eager: true
    },
    refreshTokens: {
      target: 'refresh_token',
      type: 'many-to-one',
      joinColumn: true,
    }
  }
});