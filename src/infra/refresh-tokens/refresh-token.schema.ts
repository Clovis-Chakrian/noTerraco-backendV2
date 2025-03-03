import { BaseRefreshTokenSchema } from 'src/buildingblocks/authorization/schemas/base-refresh-token.schema';
import { RefreshToken } from 'src/domain/refresh-tokens/refresh-token.entity';
import { EntitySchema } from 'typeorm';

export const RefreshTokenSchema = new EntitySchema<RefreshToken>({
  name: 'refresh_token',
  tableName: 'refresh_tokens',
  columns: {
    ...BaseRefreshTokenSchema
  },
  relations: {
    user: {
      target: 'user',
      type: 'one-to-many',
      joinColumn: true
    }
  }
});