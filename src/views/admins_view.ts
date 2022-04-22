import { Admin } from "@prisma/client";

export default {
  render(admin: Admin) {
    return {
      id: admin.id,
      name: admin.name,
      password: admin.password,
      accountType: admin.accountType
    };
  },

  renderMany(admin: Admin[]) {
    return admin.map(admin => this.render(admin));
  }
}