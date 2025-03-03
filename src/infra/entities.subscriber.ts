import { BaseEntity } from "src/buildingblocks/core/base-entity"
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm"

@EventSubscriber()
export class EntitiesSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<BaseEntity>) {
    if (event.entity !== undefined) {
      const now = new Date();
      event.entity.createdAt = now;
      event.entity.updatedAt = now;
      event.entity.createdBy = 'sistema';
      event.entity.updatedBy = 'sistema';
    }

  }

  beforeUpdate(event: UpdateEvent<BaseEntity>): Promise<BaseEntity> | void {
    if (event.databaseEntity !== undefined) {
      event.databaseEntity.updatedAt = new Date();
      event.databaseEntity.updatedBy = 'sistema';
    }
  }
}