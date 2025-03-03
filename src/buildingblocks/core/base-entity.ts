abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string;
  deleted: boolean;

  constructor(id: string) {
    const now = new Date();
    this.id = id;
    this.createdAt = now;
    this.updatedAt = now;
  }

  delete(user: string) {
    this.deletedAt = new Date();
    this.deleted = true;
    this.deletedBy = user;
  }

  restore() {
    this.deleted = false;
  }
}

export { BaseEntity };
