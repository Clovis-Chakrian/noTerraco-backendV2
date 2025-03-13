import { RefreshToken } from './refresh-token.entity';
import { FindOptionsWhere } from 'typeorm';
import { UUID } from 'crypto';

interface IRefreshTokenRepository {
  create(entity: RefreshToken): Promise<RefreshToken>;
  update(entity: RefreshToken): Promise<RefreshToken>;
  findById(id: UUID): Promise<RefreshToken | null>;
  findAll(): Promise<RefreshToken[]>;
  search(params: FindOptionsWhere<RefreshToken>): Promise<RefreshToken[]>;
}

export { IRefreshTokenRepository };