"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(admin) {
        return {
            id: admin.id,
            name: admin.name,
            password: admin.password,
            accountType: admin.accountType
        };
    },
    renderMany(admin) {
        return admin.map(admin => this.render(admin));
    }
};
