import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { IRefreshTokenRepository } from 'src/domain/refresh-tokens/refresh-token-repository.interface';
import { RefreshToken } from 'src/domain/refresh-tokens/refresh-token.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(
    @Inject('REFRESHTOKEN_REPOSITORY')
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) { }

  async create(entity: RefreshToken): Promise<RefreshToken> {
      const createdEntity = this.refreshTokenRepository.create(entity);
      await this.refreshTokenRepository.save(createdEntity);
      return createdEntity;
    }
  
    async update(entity: RefreshToken): Promise<RefreshToken> {
      const result = await this.refreshTokenRepository.update({ token: entity.token as any }, { ...entity as any });
      if (result.affected === undefined || result.affected <= 0) console.log('NADA ATUALIZADO');
      return entity;
    }
  
    async findById(id: UUID): Promise<RefreshToken | null> {
      return await this.refreshTokenRepository.findOneBy({ token: id as any });
    }
  
    async findAll(): Promise<RefreshToken[]> {
      return await this.refreshTokenRepository.find();
    }
  
    async search(params: FindOptionsWhere<RefreshToken>): Promise<RefreshToken[]> {
      return await this.refreshTokenRepository.findBy({
        ...(params as any),
      });
    }
}

export { RefreshTokenRepository };
