import { UUID } from 'crypto';
import { BaseEntity } from 'src/buildingblocks/core/base-entity';
import { FindOptionsWhere } from 'typeorm';

interface IBaseRepository<TEntity extends BaseEntity> {
  create(entity: TEntity): Promise<TEntity>;
  update(entity: TEntity): Promise<TEntity>;
  findById(id: UUID): Promise<TEntity | null>;
  findAll(): Promise<TEntity[]>;
  search(params: FindOptionsWhere<TEntity>): Promise<TEntity[]>;
}

export { IBaseRepository };
