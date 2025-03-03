import { BaseRoleSchema } from 'src/buildingblocks/authorization/schemas/base-role.schema';
import { Role } from 'src/domain/roles/role.entity';
import { EntitySchema } from 'typeorm';

export const RoleSchema = new EntitySchema<Role>({
  name: 'role',
  tableName: 'roles',
  columns: {
    ...BaseRoleSchema
  },
  relations: {
    users: {
      target: 'user',
      type: 'many-to-many',
      joinTable: {
        name: 'users_roles'
      }
    }
  }
});