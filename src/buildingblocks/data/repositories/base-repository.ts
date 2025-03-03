import { FindOptionsWhere, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { BaseEntity } from 'src/buildingblocks/core/base-entity';
import { IBaseRepository } from './base-repository.interface';

abstract class BaseRepository<TEntity extends BaseEntity> implements IBaseRepository<TEntity> {
  private readonly repository: Repository<TEntity>;

  constructor(repository: Repository<TEntity>) {
    this.repository = repository;
  }

  async create(entity: TEntity): Promise<TEntity> {
    const createdEntity = this.repository.create(entity);
    await this.repository.save(createdEntity);
    return createdEntity;
  }

  async update(entity: TEntity): Promise<TEntity> {
    const result = await this.repository.update({ id: entity.id as any }, { ...entity as any });
    if (result.affected === undefined || result.affected <= 0) console.log('NADA ATUALIZADO');
    return entity;
  }

  async findById(id: UUID): Promise<TEntity | null> {
    return await this.repository.findOneBy({ id: id as any });
  }

  async findAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }

  async search(params: FindOptionsWhere<TEntity>): Promise<TEntity[]> {
    return await this.repository.findBy({
      ...(params as any),
    });
  }
}

export { BaseRepository };
