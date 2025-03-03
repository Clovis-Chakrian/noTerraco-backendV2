import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/buildingblocks/data/repositories/base-repository';
import { Role } from 'src/domain/roles/role.entity';
import { Repository } from 'typeorm';

@Injectable()
class RoleRepository extends BaseRepository<Role> {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}

export { RoleRepository };
